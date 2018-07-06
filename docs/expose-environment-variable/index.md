<p>You can expose Environment Variables from one Step,
to make it available for every other Step performed after the Step during the build.
An example might be that you want to generate a
release note which you want to use in a message or deploy step.
Exposing environment variables is really easy,
you just have to use <a href="https://github.com/bitrise-io/envman/">envman</a> if you want to make it available for every other Step.</p>
<p>A very simple example might be:</p>
<pre><code>envman add --key MY_RELEASE_NOTE --value &quot;This is the release note&quot;
</code></pre>
<p>You can call <code>envman</code> in any Step, including a script step,
or even in your own script (stored in your repository) if you call it from a <code>bitrise</code> build.</p>
<p>Envman can be used in a couple of ways.
You can specify the value as the <code>--value</code> parameter (you can see this in the previous example),
pipe the value:</p>
<pre><code>echo 'hi' | envman add --key MY_RELEASE_NOTE
</code></pre>
<p>or read the value from a file:</p>
<pre><code>envman add --key MY_RELEASE_NOTE --valuefile ./some/file/path
</code></pre>
<p><em>You can read more about how <code>envman</code> can
be used on it's <a href="https://github.com/bitrise-io/envman/">GitHub page</a>.</em></p>
<p>!!! warning &quot;Env Var value size limit&quot;
Environment Variable values set through <code>envman</code> are limited to 10KB by default.
This is done in order to prevent issues with common tools.
Different tools have different environment size constraints,
e.g. <code>Bash</code> will start to fail on OS X once the environments set
exceed ~120KB (<strong>in total, not a single variable!</strong>).</p>
<pre><code>For larger data you should use files or other solutions,
and use environment variables to point to the file / to the
ID or location of where the data is stored.
</code></pre>
<p>Once the environment variable is exposed you can use it like
any other environment variable. In <code>bash</code> you can reference
the previous example environment as: <code>$MY_RELEASE_NOTE</code>.</p>
<p>You can of course use these exposed environment variables in the inputs of other Steps.
For example the <strong>HockeyApp Deploy</strong> step has a <code>notes</code> input,
you can reference the previous example variable by inserting <code>$MY_RELEASE_NOTE</code> into the input,
like: <code>The Release Note: $MY_RELEASE_NOTE</code>,
which will be resolved as <code>The Release Note: This is the release note</code> (if you used
the first example to set the value of <code>MY_RELEASE_NOTE</code>).</p>
<p>A simple example, exposing the release note and then using it in another <code>Script step</code>,
and in a <code>Slack step</code>:</p>
<pre><code>format_version: 1.1.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  example:
    steps:
    - script:
        inputs:
        - content: |
            #!/bin/bash
            envman add --key MY_RELEASE_NOTE --value &quot;This is the release note&quot;
    - script:
        inputs:
        - content: |
            #!/bin/bash
            echo &quot;My Release Note: $MY_RELEASE_NOTE&quot;
    - slack:
        inputs:
        - channel: ...
        - webhook_url: ...
        - message: &quot;Release Notes: $MY_RELEASE_NOTE&quot;
</code></pre>
<h2>Copy an environment variable to another key</h2>
<p>If you want to expose the value of an environment variable to be accessible
through another environment variable key, you can simply expose the value with a new key.</p>
<p>For example, if you want to copy the value of the <code>BITRISE_BUILD_NUMBER</code> environment variable
and make it available under the environment variable key <code>MY_BUILD_NUMBER</code>, you just have to
read the current value and expose it under the new key.</p>
<p>To modify the first example here, which exposed a fix value:</p>
<pre><code>envman add --key MY_RELEASE_NOTE --value &quot;This is the release note&quot;
</code></pre>
<p>simply reference/read the value of the other environment variable in the <code>envman add ...</code> command.</p>
<p>To expose the value of <code>BITRISE_BUILD_NUMBER</code> under the key <code>MY_BUILD_NUMBER</code>:</p>
<pre><code>envman add --key MY_BUILD_NUMBER --value &quot;${BITRISE_BUILD_NUMBER}&quot;
</code></pre>
<p>After this, subsequent steps can get the value of <code>BITRISE_BUILD_NUMBER</code> from the
<code>MY_BUILD_NUMBER</code> environment variable.</p>
<p><em>Note: if you change the value of <code>BITRISE_BUILD_NUMBER</code> after this, the
value of <code>MY_BUILD_NUMBER</code> won't be modified, that will still hold the original value!</em></p>
<h2>Overwrite an Environment Variable if another one is set</h2>
<p>E.g. if a custom environment variable is set through the Build Trigger API.</p>
<p>The best way to do this, to make sure that no matter what, you overwrite the other env var,
is to use a Script step, as described above, and check whether the custom env var is set.</p>
<p>As an example, if you want to overwrite the <code>PROJECT_SCHEME</code> environment variable,
if, let's say, a <code>API_PROJECT_SCHEME</code> env var is set, just drop in a <code>Script</code> step (can be the very first one
in the workflow), with the content:</p>
<pre><code>#!/bin/bash
set -ex
if [ ! -z &quot;$API_PROJECT_SCHEME&quot; ] ; then
  envman add --key PROJECT_SCHEME --value &quot;$API_PROJECT_SCHEME&quot;
fi
</code></pre>
<p>This script will check whether the <code>API_PROJECT_SCHEME</code> env var is defined,
and if it is, then its value will be assigned to the <code>PROJECT_SCHEME</code> environment variable,
overwriting the original value of <code>PROJECT_SCHEME</code>.</p>
<h3>Alternative solution: use Workflow Env Vars</h3>
<p>Alternatively you can set environment variables for Workflows too.
The Env Vars you set for a workflow will overwrite the env var
if defined as an App Env Var or Secret Env Var.</p>
<p>An example workflow which defined an environment variable, and then runs another workflow
which can use those env vars:</p>
<pre><code>workflows:

  deploy-alpha:
    envs:
    - ENV_TYPE: alpha
    after_run:
    - _deploy

  _deploy:
    steps:
    - script:
        inputs:
        - content: |
            #!/bin/bash
            echo &quot;ENV_TYPE: $ENV_TYPE&quot;
</code></pre>
<p>If you run the <code>deploy-alpha</code> workflow, that will set the <code>ENV_TYPE</code> env var to <code>alpha</code>,
then it will run the <code>_deploy</code> workflow, which can use that environment variable -
in this example it will simply print its value (the printed text will be: <code>ENV_TYPE: alpha</code>).</p>
