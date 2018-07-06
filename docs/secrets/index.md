<p>Secrets can be accessed and used in a similar way as App Env Vars,
the main difference is that <strong>secrets are not stored as part of the build configuration</strong>.</p>
<p>When you run a build locally, with the Bitrise CLI, the secrets are read from
a <code>.bitrise.secrets.yml</code> file, which is expected to be in the same directory
where the <code>bitrise.yml</code> is, and where you run the <code>bitrise run</code> command.</p>
<p>If you want to store your secrets somewhere else, you can specify
the location of the secrets file with the <code>--inventory</code> flag of the <code>bitrise run</code> command,
e.g. <code>bitrise run my-workflow --inventory /path/to/secrets.yml</code>.</p>
<p>!!! warning &quot;Make sure to <code>gitignore</code> your secrets file!&quot;
As a best practice, you should always make sure that the <code>.bitrise.secrets.yml</code>
is added to your <code>.gitignore</code>, so that it will never be committed into your
repository! The best is if you <code>gitignore</code> everything what
starts with <code>.bitrise</code>, which can be done by adding the
line: <code>.bitrise*</code> to your <code>.gitignore</code> file.</p>
<p>The format of the secrets YAML file is really simple. It have to include
a root <code>envs:</code> item and then the list of environment variables.</p>
<p>Example:</p>
<pre><code class="language-yaml">envs:
- SECRET_ENV_ONE: first secret value
- SECRET_ENV_TWO: second secret value
</code></pre>
<p>The environment variables defined in the secrets file can be used
just like any other environment variable, so, if you save the above
example into a <code>.bitrise.secrets.yml</code> file, and you have a <code>bitrise.yml</code>
file in the same directory with the content:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: |
            #!/bin/bash
            echo &quot;SECRET_ENV_ONE: ${SECRET_ENV_ONE}&quot;
            echo &quot;SECRET_ENV_TWO: ${SECRET_ENV_TWO}&quot;
</code></pre>
<p>You can just <code>bitrise run test</code> in the directory, and you'll see that the Script
step will print the values specified in the secrets file:</p>
<pre><code>...
+------------------------------------------------------------------------------+
| (0) script@1.1.3                                                             |
+------------------------------------------------------------------------------+
| id: script                                                                   |
| version: 1.1.3                                                               |
| collection: https://github.com/bitrise-io/bitrise-steplib.git                |
| toolkit: bash                                                                |
| time: 2016-12-08T18:45:19+01:00                                              |
+------------------------------------------------------------------------------+
|                                                                              |
SECRET_ENV_ONE: first secret value
SECRET_ENV_TWO: second secret value
|                                                                              |
+---+---------------------------------------------------------------+----------+
| ✓ | script@1.1.3                                                  | 0.32 sec |
+---+---------------------------------------------------------------+----------+
...
</code></pre>
<p>As Secrets are the first environment variables processed when you execute
a <code>bitrise run</code> command, you can use the environment variables everywhere in
your <code>bitrise.yml</code>, for example in <code>App Env Vars</code> (<code>app: envs:</code> in the <a href="/bitrise-cli/basics-of-bitrise-yml/">bitrise.yml</a>),
<a href="/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables">Workflow environment variables</a>
and Step inputs too.</p>
