<h2>Disable a Step</h2>
<p>If you don't want to remove the Step from your Workflow and you don't want to
duplicate the Workflow either (which is the preferred way if you want to experiment with new things;
you can just create a &quot;backup&quot; clone of your original Workflow)
then you can simply disable a Step by specifying <code>run_if: false</code> .</p>
<p>Example:</p>
<pre><code>- script:
    run_if: false
    inputs:
    - content: |-
        #!/bin/bash
        echo &quot;This will never run, because of run_if:false&quot;
</code></pre>
<h2>Run a Step only in CI environment, skip it for local builds</h2>
<p>This is quite similar to how you <a href="#disable-a-step">completely disable a step</a>,
but instead of specifying <code>false</code>
as the <code>run_if</code> expression, you specify <code>.IsCI</code>, which will only be true in CI mode.</p>
<p>This method can be useful to debug builds locally, where you don't want to run
specific steps on your own Mac/PC. Lots of Steps have this <code>run_if</code> flag set by default,
for example the <code>Git Clone</code> step is configured with <code>run_if: .IsCI</code> in the step's
default configuration (<code>step.yml</code>), because the most common use case when you
run a build locally is that you already have the code on your Mac/PC
and so you don't want to do a <code>Git Clone</code>. Of course you can change the <code>run_if</code>
property of any step, so you can specify a <code>run_if: true</code> for the <code>Git Clone</code>
step if you want to run it locally too.</p>
<p>!!! note
CI mode can be enabled on your own Mac/PC by setting the <code>CI</code> environment to <code>true</code>
(e.g. with <code>export CI=true</code> in your Bash Terminal), or by running
<code>bitrise run</code> with the <code>--ci</code> flag: <code>bitrise --ci run ...</code>._</p>
<h2>Run a Step only if the Build failed</h2>
<p><em>To do this you have to switch to <code>bitrise.yml</code> mode
(open the Workflow Editor on bitrise.io -&gt; left side: click on <code>bitrise.yml</code>
to switch to the interactive <code>bitrise.yml</code> editor).</em></p>
<p>You have to add two properties to the Step you <strong>only</strong> want to run when
the Build failed (at that point, when the Step would run):</p>
<ul>
<li><code>is_always_run: true</code> (this enables the Step to be considered to run even if a previous Step failed)</li>
<li><code>run_if: .IsBuildFailed</code> (you can find more examples of the <code>run_if</code> template at: <a href="https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/templates/bitrise.yml">https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/templates/bitrise.yml</a>).</li>
</ul>
<p>An example <code>script</code> step, which will only run if the Build failed:</p>
<pre><code>- script:
    is_always_run: true
    run_if: .IsBuildFailed
    inputs:
    - content: |-
        #!/bin/bash
        echo &quot;Build Failed!&quot;
</code></pre>
<p>!!! note &quot;A <strong>run_if</strong> can be any valid <strong>Go</strong> template&quot;
A <code>run_if</code> can be any valid <a href="https://golang.org/pkg/text/template/">Go template</a>, as long as it evaluates to <code>true</code> or <code>false</code> (or any of the String representation, e.g. <code>&quot;True&quot;</code>, <code>&quot;t&quot;</code>, <code>&quot;yes&quot;</code> or <code>&quot;y&quot;</code> are all considered to be <code>true</code>). If the template evaluates to <code>true</code> the Step will run, otherwise it won't.</p>
<p>An example <code>run_if</code> to check a <strong>custom environment variable</strong> (you
can expose environment variables from your scripts too,
using <a href="https://github.com/bitrise-io/envman/">envman</a>):</p>
<pre><code>run_if: |-
  {{enveq &quot;CUSTOM_ENV_VAR_KEY&quot; &quot;test value to test against&quot;}}
</code></pre>
<p>This <code>run_if</code> will skip the step in every case when the value of <code>CUSTOM_ENV_VAR_KEY</code>
is not <code>test value to test against</code>.</p>
