<h2>What is a Step</h2>
<p>A Step encapsulates a &quot;build task&quot;: the code to perform that task, the inputs/parameters
you can define for the task, and the outputs the task generates.</p>
<p>For example the <code>Git Clone</code> (id: <code>git-clone</code>) step performs a &quot;git clone&quot;
of the specified repository, with the inputs you (or the system) specify (e.g.
the branch, tag or commit to clone, the local path where the clone should happen, etc.).</p>
<p>From a technical perspective a Step is a semver <strong>versioned</strong> repository
which includes the <em>code</em> of the Step and the <em>interface</em> definition of the Step.</p>
<p>The <em>step interface definition</em> (<code>step.yml</code>) includes information like the dependencies of the step,
the inputs and outputs of the step, the title and description of the step;
and other properties like the issue tracker / support URL, or
the filter properties which define when the step should be performed or skipped
and whether a failed step should mark the build as failed.</p>
<p>From a configuration perspective all you have to know about Bitrise Steps
is how you can include and configure them in your build configuration (<code>bitrise.yml</code>).</p>
<p>To include a Step you have to reference it by a <a href="#step-referenceid-format">Step reference/ID</a>
in the <code>steps:</code> list of a Workflow.</p>
<p>An example, with a single <code>script</code> step, which will be executed when you run <code>bitrise run test</code>:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
</code></pre>
<p>!!! note &quot;List of available steps (step IDs)&quot;
You can list all the available steps in the main Bitrise StepLib
by running <code>bitrise step-list</code>, or by checking
<a href="https://github.com/bitrise-io/bitrise-steplib/tree/master/steps">the steps/ directory of the main Bitrise StepLib repository</a>.</p>
<p>Once you include a step in your build configuration (<code>bitrise.yml</code>),
you can specify configurations for the step. The most common thing
you'll do is to specify values for the step's inputs.
You can do this with the <code>inputs:</code> list property of the step,
defining the <em>key</em> of the input and the <em>value</em> you want to set.</p>
<p>For example, to specify a simple script to perform for the <code>script</code> step,
you can specify a value for the <code>script</code> step's <code>content</code> input.
(<em>Note: you can list all the inputs of a step with <code>bitrise step-info STEP-ID</code></em>)</p>
<p>Let's do a simple &quot;Hello World&quot; script, using the <code>script</code> step:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: &quot;echo 'Hello World!'&quot;
</code></pre>
<p>When you run the <code>test</code> workflow of this configuration with <code>bitrise run test</code>
you'll now see that the <code>script</code> step prints the text <code>Hello World</code> in its log:</p>
<pre><code>+------------------------------------------------------------------------------+
| (0) script@1.1.3                                                             |
+------------------------------------------------------------------------------+
| id: script                                                                   |
| version: 1.1.3                                                               |
| collection: https://github.com/bitrise-io/bitrise-steplib.git                |
| toolkit: bash                                                                |
| time: 2016-12-07T17:05:17+01:00                                              |
+------------------------------------------------------------------------------+
|                                                                              |
Hello World!
|                                                                              |
+---+---------------------------------------------------------------+----------+
| ✓ | script@1.1.3                                                  | 0.30 sec |
+---+---------------------------------------------------------------+----------+
</code></pre>
<p>If the step doesn't have any required inputs you don't have to specify an input,
and of course you can specify values for as many inputs as you want to.</p>
<p>For example the <code>script</code> step can run Ruby scripts too, not just Bash scripts.
To do this, in addition to specifying the script in the <code>content</code> input
you also have to specify the &quot;runner&quot; input:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: &quot;puts 'Hello Ruby!'&quot;
        - runner_bin: ruby
</code></pre>
<p>Step input values are always <strong>string</strong> / text values, as the input id/key and the value
are passed to the step as environment variables
(<a href="/bitrise-cli/most-important-concepts/#every-input-output-and-parameter-is-an-environment-variable">more information</a>),
and the value can be multi line too, using the standard YAML multi line format.
An example multi line Bash script:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: |
            #!/bin/bash
            set -ex
            var_to_print='Hello World!'
            echo &quot;${var_to_print}&quot;
</code></pre>
<p>!!! note &quot;Watch out for the indentation!&quot;
Indentation in the YAML format is very important!
You should use two-spaces indentation, and you can't use tabs to indent!</p>
<pre><code>If you use a multi line value, like the one above, it's important that you
have to _indent the value with two spaces_, compared to the key!
</code></pre>
<p>You can change other properties of the step too, not just the inputs.
For example, if you want to &quot;force&quot; run the step even if a previous step fails,
you can set the <code>is_always_run</code> property to <code>true</code>:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        is_always_run: true
        inputs:
        - content: &quot;puts 'Hello Ruby!'&quot;
        - runner_bin: ruby
</code></pre>
<p>or if you want to specify a better, more descriptive title for the step,
you can use the <code>title</code> property:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        title: Print Hello Ruby
        is_always_run: true
        inputs:
        - content: &quot;puts 'Hello Ruby!'&quot;
        - runner_bin: ruby
</code></pre>
<h3>The Step data you define in bitrise.yml - your diff!</h3>
<p>You might already suspect it after the examples above:
the step data / infos you specify in the <code>bitrise.yml</code> are the parameters
of the step <strong>you want to change</strong> / overwrite.</p>
<p>If you don't specify any input or other step property, only the step (reference/iD),
that means that the step should run with the default values (defined by the step's developer).</p>
<p>You could also think about this as a <code>diff</code>. The step defines values for the step interface
properties, and in the <code>bitrise.yml</code> you define a <code>diff</code>, the things you want to change
and the values to change to.</p>
<p>Let's go through the example above:</p>
<pre><code class="language-yaml">    - script@1.1.3:
        title: Print Hello Ruby
        is_always_run: true
        inputs:
        - content: &quot;puts 'Hello Ruby!'&quot;
        - runner_bin: ruby
</code></pre>
<p>The <code>- script@1.1.3:</code> line selects the step, and the properties you define after this
(with an indentation!)
are the things you want to overwrite.</p>
<p>To see the step's raw interface definition you can check it in the step library.
In these examples we always use the <a href="https://github.com/bitrise-io/bitrise-steplib">main Bitrise StepLib</a>.
The step interface definitions can be found in the StepLib's
<a href="https://github.com/bitrise-io/bitrise-steplib/tree/master/steps"><code>steps</code> directory</a>,
in this case it's in the <a href="https://github.com/bitrise-io/bitrise-steplib/tree/master/steps/script/1.1.3">steps/script/1.1.3</a> directory,
as we used the <code>1.1.3</code> version of the <code>script</code> step.
The <a href="https://github.com/bitrise-io/bitrise-steplib/blob/master/steps/script/1.1.3/step.yml"><code>step.yml</code> in this directory is the step's interface definition</a>.</p>
<p><a href="https://github.com/bitrise-io/bitrise-steplib/blob/master/steps/script/1.1.3/step.yml">Check the <code>step.yml</code></a>,
you can see all the properties defined for this version of the step.
Now, if you check our example above, all we did is to
change the <code>title</code> property (from <code>Script</code> to <code>Print Hello Ruby</code>),
the <code>is_always_run</code> property (from <code>false</code> to <code>true</code>)
and two inputs of the step, <code>content</code> (from a default, example script content)
and <code>runner_bin</code> (from <code>/bin/bash</code> to <code>ruby</code>).</p>
<p>All other properties you can see in the step version's <code>step.yml</code> will be read
from the <code>step.yml</code>, you don't have to define those. You only have to define
<strong>the things you want to change</strong>, compared to the values specified for the step
in the step's interface definition (<code>step.yml</code>).</p>
<h2>Step reference/ID format</h2>
<p>A step reference from the example <code>bitrise.yml</code> above:</p>
<pre><code>- script@1.1.3:
</code></pre>
<ol>
<li>the StepLib source</li>
<li>the Step ID</li>
<li>the Step Version</li>
</ol>
<p>Step reference format: <code>- StepLibSource::StepID@StepVersion:</code></p>
<p><strong>From the three components only Step ID is required (e.g. <code>- script:</code>).</strong>
This example item could alternatively be written as <code>- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:</code>,
to include all three components of the step reference.</p>
<p>If the Version is not defined, the latest version of the step will be used.</p>
<p>If the StepLib Source is not defined, the <code>default_step_lib_source</code> will be used.</p>
<p>So, if <code>default_step_lib_source</code> is set to <code>https://github.com/bitrise-io/bitrise-steplib.git</code>,
and the latest version of the Script step is <code>1.1.3</code>, all the following references
will mean the exact same thing:</p>
<ul>
<li><code>- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:</code></li>
<li><code>- script@1.1.3:</code></li>
<li><code>- https://github.com/bitrise-io/bitrise-steplib.git::script:</code></li>
<li><code>- script:</code></li>
</ul>
<p>But, if a new version of the <code>script</code> step is released (e.g. <code>2.0.0</code>)
and you don't include the <code>@1.1.3</code> version reference component,
new builds will use the &quot;latest version at the time&quot;.
For this reason, it's usually a good idea to specify the version of the step,
so that your build does not break accidentally when a breaking change
is introduced in a new version of the step.</p>
<h3>Special step sources</h3>
<p>There are two special step sources:</p>
<ul>
<li><code>git::</code></li>
<li>and <code>path::</code></li>
</ul>
<p>When you use one of these sources, the step won't be identified through
a Step Library, but through the ID data you specify.</p>
<p>For example, the <code>script</code> step's github is at: <code>https://github.com/bitrise-io/steps-script</code>.
To reference the <code>script</code> step directly through a git reference,
you can use the <code>git::</code> source, the step's git clone URL,
and the branch or tag in the repository.</p>
<p>Example, to reference the <code>1.1.3</code> version tag of the script step's repository:</p>
<pre><code>- git::https://github.com/bitrise-io/steps-script.git@1.1.3:
</code></pre>
<p>In general, <strong>whenever you can use a step version through a Step Library,
you should do that</strong>, instead of using the <code>git::</code> source type,
because features like <em>local step caching</em> or <em>network caching</em> / alternative
download URLs are only supported for steps shared in a StepLib.</p>
<p>But this type of referencing allows certain things you can't get through
a StepLib. For example the <code>git::</code> source type can be used for not-yet-published or
work-in-progress states of a step.
If you <a href="/bitrise-cli/create-your-own-step/">develop your own Step</a> you can use
this <code>git::</code> source type to test your step <em>before you would publish it</em>
in a StepLib.</p>
<p>Example:</p>
<pre><code>- git::https://github.com/bitrise-io/steps-script.git@BRANCH-OR-TAG:
</code></pre>
<p><code>BRANCH-OR-TAG</code> of course have to be a branch or tag which does exist in
the step's repository. For example, if you develop your own Step
and you work on a <code>soon-to-be-released</code> branch, you can
use that state of the step with:</p>
<pre><code>- git::https://github.com/bitrise-io/steps-script.git@soon-to-be-released:
</code></pre>
<p>The second special source is <code>path::</code>, which works in a similar way,
except for <strong>local paths</strong>, and it requires no version information.</p>
<p>A good example for this is, again, when you create and work on your own
Step, you can run the state of the Step (step's code) directly on your Mac/PC,
without even pushing it to the step's repository.</p>
<p>Both absolute and relative (relative to the <code>bitrise.yml</code>!) local paths are supported, so you can:</p>
<pre><code>- path::/path/to/my/step:
</code></pre>
<p>as well as:</p>
<pre><code>- path::./relative/path:
</code></pre>
<p>During step development it's a best practice to have a <code>bitrise.yml</code> directly
in the step's repository, for unit and ad hoc testing. In this case <em>the current directory is the step directory</em>,
and the step can be referenced with:</p>
<pre><code>- path::./:
</code></pre>
<p><em>This can also be used if you want to include your build steps in your app's source code.</em>
For example if you store the <code>script</code> step's code in your source code repository,
under the <code>steps/script</code> directory, you can run the version included in your source code
repository with:</p>
<pre><code>- path::./steps/script:
</code></pre>
