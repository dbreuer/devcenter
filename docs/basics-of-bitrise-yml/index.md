<p>A bare minimal <code>bitrise.yml</code> is as simple as:</p>
<pre><code class="language-yaml">format_version: 1.3.1
</code></pre>
<p>This configuration is valid, everything else is optional, but does not include anything to execute,
there's nothing to <code>run</code>.</p>
<p>A minimal configuration which you can <code>bitrise run</code>:</p>
<pre><code class="language-yaml">format_version: 1.3.1
workflows:
  test:
</code></pre>
<p>This configuration can be executed with <code>bitrise run test</code>, and the <code>bitrise</code> CLI
won't give you any errors, but of course there's still nothing declared to do.</p>
<p>Let's continue with our example from the previous guide,
which executes a single Script step when you run it with <code>bitrise run test</code>,
and talk about what's what in the configuration:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

app:
  envs:
  - MY_NAME: My Name

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: echo &quot;Hello ${MY_NAME}!&quot;
</code></pre>
<p>A quick walk through of this sample configuration:</p>
<ul>
<li><code>format_version</code> : this property declares the minimum Bitrise CLI format version.
You can get your Bitrise CLI's supported highest format version with: <code>bitrise version --full</code>.
If you set the <code>format_version</code> to <code>1.3.1</code> that means that Bitrise CLI versions which
don't support the format version <code>1.3.1</code> or higher won't be able to run the configuration.
This is important if you use features which are not available in older Bitrise CLI versions.</li>
<li><code>default_step_lib_source</code> : specifies the source to use when no other source is defined for a step.
More info a bit later, in the <code>- script@1.1.3:</code> step description.</li>
<li><code>app</code> - <code>envs</code> : the <code>app: envs:</code> section specifies Environment Variables which will be available for
every build, every workflow, every step.</li>
<li><code>workflows</code> : the workflows section is the collection of separate build configurations
which you can run with <code>bitrise run WORKFLOWID</code>.
In this example the only workflow is <code>test</code>, which you can perform with <code>bitrise run test</code>.
If you'd have a second workflow called <code>main</code>, you could run both <code>bitrise run test</code> and <code>bitrise run main</code>.</li>
<li><code>steps:</code> : the list of steps which should be executed when the workflow is performed.
In this example the <code>test</code> workflow includes only a single <code>script</code> step. If more than one
step is declared, the steps are performed one by one, after each other.</li>
<li><code>- script@1.1.3:</code> : a step (reference) to perform. This reference does not have a &quot;StepLib Source&quot; declaration,
which means that the <code>default_step_lib_source</code> will be used as the StepLib Source.
For more information check the <a href="/bitrise-cli/steps/#step-reference">Step reference section of the Steps guide</a>.</li>
<li><code>inputs:</code> : the inputs you want to specify for the given step.
A step can have many inputs,
but <em>you only have to specify those in the <code>bitrise.yml</code> which you want to set/overwrite.</em>
For more information see the <a href="/bitrise-cli/steps">Steps documentation</a>.</li>
<li><code>- content:</code> : the input we want to set. In this example we only wanted to specify the Content
of the Script step, all other inputs are irrelevant.</li>
<li><code>echo &quot;Hello ${MY_NAME}!&quot;</code> : this is the <strong>value</strong> we specified for the <code>content</code> input.</li>
</ul>
<p>Read on to learn more about how you can use multiple workflows,
define multiple steps to execute for a given workflow and for
more advanced concepts. You'll be able to define your perfect automation
configuration in no time!</p>
