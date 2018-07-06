<h2>Every input, output and parameter is an Environment Variable</h2>
<p>Every step input, step output, secret environment variable, app environment variable and workflow environment variable
(basically every input and variable in your build config) is an environment variable.</p>
<p>There's nothing special about how Bitrise handles environment variables,
<strong>these are regular environment variable, with the same rules and restrictions as any other environment variable.</strong></p>
<p>To highlight a couple of technical details:</p>
<h3>The value of an Environment Variable can only be a String</h3>
<p>Environment Variables can only hold <code>String</code> values. Even if you set a number or bool, like <code>1</code> or <code>true</code> as
the value of the Environment Variable, that will be a string.</p>
<h3>Parent process can't access  Environment Variables exposed by child processes</h3>
<p>Parent process(es) can't access Environment Variables exposed by child processes.</p>
<p>For example, if you run a <code>my_bash_script.sh</code> in your Terminal with <code>bash my_bash_script.sh</code>,
and <code>my_bash_script.sh</code> sets an environment variable with <code>export MY_VAR=the-value</code>,
you won't be able to access <code>MY_VAR</code> in your Terminal after the script is finished,
<code>MY_VAR</code> will only be available in <code>my_bash_script.sh</code> <strong>and</strong> in the processes / scripts
started by <code>my_bash_script.sh</code>.</p>
<p>In terms of Bitrise CLI this means that if you <code>export MY_VAR=...</code> in a Script step,
<code>MY_VAR</code> won't be available in subsequent steps. This is true for the steps too,
regardless of which language the step is written in.</p>
<p>Bitrise CLI includes a mechanism for exposing environment variables from Steps
so that subsequent Steps can also access it, through the Bitrise CLI tool
called <a href="https://github.com/bitrise-io/envman">envman</a>.</p>
<p>To set an environment variable in your script or in your step to make that
available in other steps too, you have to do that through <code>envman</code>.</p>
<p>A simple example:</p>
<pre><code>envman add --key MY_TEST_ENV_KEY --value 'test value for test key'
</code></pre>
<p>You can find more examples in <a href="https://github.com/bitrise-io/envman">envman's README</a>,
and in the <a href="/tips-and-tricks/expose-environment-variable">Expose an Environment Variable and use it in another Step</a> guide.</p>
<h2>Availability order of environment variables</h2>
<p>Environment variables are available <strong>after</strong> the environment variable
is &quot;processed&quot;.</p>
<p>There are a few environment variables <a href="/faq/available-environment-variables/#exposed-by-the-bitrise-cli">exposed by the Bitrise CLI itself</a>,
those are available from the start (e.g. <code>BITRISE_SOURCE_DIR</code> and <code>BITRISE_TRIGGERED_WORKFLOW_ID</code>).</p>
<p>All other environment variables are &quot;processed&quot; / made available <em>as the build progresses.</em></p>
<p>There are two types of environment variables which are processed and
made available before the workflow would be executed:
<a href="/bitrise-cli/secrets/">Secrets</a> and <code>App Env Vars</code> (<code>app: envs:</code> in the <a href="/bitrise-cli/basics-of-bitrise-yml/">bitrise.yml</a>).</p>
<p>After these, the processing of the specified Workflow starts, and the
<a href="/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables">environment variables specified for that Workflow</a>
are made available. If the workflow has before or after workflows, when
a specific workflow is processed (right before the first step of the workflow would run)
the workflow's environment variables are processed and made available.</p>
<p>Step inputs are also environment variables;
those are exposed only for the specific step, and right before the Step would start.</p>
<p>Last but not least Step outputs are exposed by the specific step,
so those are available for subsequent steps <strong>after the Step finishes</strong>.</p>
<p><strong>The environment variable processing order:</strong></p>
<ol>
<li><a href="/faq/available-environment-variables/#exposed-by-the-bitrise-cli">Bitrise CLI exposed environment variables</a></li>
<li><a href="/bitrise-cli/secrets/">Secrets</a></li>
<li>One-off environment variables specified for the build through the <a href="/api/build-trigger">Build Trigger API</a></li>
<li><code>App Env Vars</code> (<code>app: envs:</code> in the <a href="/bitrise-cli/basics-of-bitrise-yml/">bitrise.yml</a>)</li>
<li><a href="/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables">Workflow environment variables</a></li>
<li>Step inputs</li>
<li>Step outputs</li>
</ol>
<p><strong>So, why does the processing order matter?</strong></p>
<p>An environment variable is only available <strong>after</strong> it is processed and made available.
<strong>When you reference or use an environment variable, you can only reference/use those which are already processed!</strong></p>
<p>A couple of examples:</p>
<ul>
<li>In the value of a <code>Secret</code> environment variable,
you can use environment variables exposed by Bitrise CLI,
but you can't use any other environment variable (App Env Vars, Workflow Env Vars, ...),
as those are not processed when secrets are processed.</li>
<li>In the value of an <code>App Env Var</code>, you can use environment variables
from <code>Secrets</code> as well as the Bitrise CLI exposed ones, but you can't use Workflow Env Vars,
nor Step inputs.</li>
<li>In a <code>Workflow environment variable</code> you can use all the above (<code>Secrets</code>, <code>App Env Vars</code>,
Bitrise CLI exposed env vars).</li>
<li>And finally, in step input values, you can use all other environment variables,
including the workflow's environment variables, as well as the outputs
of steps which run before the specific step.</li>
</ul>
<h3>Environment variables of chained workflows</h3>
<p>Once an environment variable of a workflow is processed and made available,
it is available everywhere else during the build. This means that other workflows
of the chain <strong>can</strong> use the environment variables of a workflow which is performed <strong>before</strong>
the specific workflow, similar to Step outputs, which are available for every
other step <strong>after</strong> the step (which generates the outputs) completes.</p>
<p>You can find more information about environment variable availability
of Workflow env vars in chained workflows in the
<a href="/bitrise-cli/workflows/#note-about-workflow-environment-variables">Workflows: Note about workflow environment variables</a>
documentation.</p>
