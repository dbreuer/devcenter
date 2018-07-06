<p>A workflow is a collection of steps, environment variables,
and other configurations for a single <code>bitrise run</code>.</p>
<p>The only requirement for a workflow is an ID.</p>
<pre><code class="language-yaml">format_version: 1.3.1
workflows:
  test:
</code></pre>
<p>In this configuration we declared one workflow, with the ID <code>test</code>.
You can define as many workflows as you want to, and run a specific
workflow with <code>bitrise run WORKFLOWID</code>.</p>
<pre><code class="language-yaml">format_version: 1.3.1
workflows:
  first:
  second:
</code></pre>
<p>This configuration contains two workflows, <code>first</code> and <code>second</code>,
so you can execute both <code>bitrise run first</code> and <code>bitrise run second</code>.</p>
<p>!!! note &quot;Available workflow list&quot;
You can list all the available workflows in a <code>bitrise.yml</code>
by running <code>bitrise run</code> or <code>bitrise workflows</code> in the directory
of the <code>bitrise.yml</code>.</p>
<h2>Add steps to a workflow</h2>
<p>To add steps to a workflow simply include <code>steps:</code> and then the list of steps.
For example to run two script steps after each other:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
        title: First step
    - script:
        title: Second step
</code></pre>
<p>When you you run <code>bitrise run test</code>, the Bitrise CLI will run the two
script steps one by one, starting with <code>First step</code> and then
continuing with <code>Second step</code>.</p>
<p><em>To learn more about Build Steps, check the <a href="/bitrise-cli/steps">Steps</a> section.</em></p>
<h2>Define workflow specific parameters / environment variables</h2>
<p>In addition to steps, you can also specify environment variables
for every workflow.</p>
<p>The environment variables you specify for a given workflow will be used
when the workflow is executed and will be available for every step
in the workflow.</p>
<p>An example, defining two environment variables (<code>ENV_VAR_ONE</code> and <code>ENV_VAR_TWO</code>)
for the <code>test</code> workflow:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    envs:
    - ENV_VAR_ONE: first value
    - ENV_VAR_TWO: second value
</code></pre>
<h2>Chaining workflows and reusing workflows</h2>
<p>It's also possible to &quot;chain&quot; workflows, to run one or more workflow
before and/or after a specific workflow.</p>
<p>An example:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:

  send-notifications:
    steps:
    # send notifications

  setup:
    steps:
    # setup steps to run

  test:
    before_run:
    - setup
    envs:
    - IS_TEST: &quot;true&quot;
    steps:
    # test steps to run

  ci:
    before_run:
    - test
    after_run:
    - send-notifications

  deploy:
    before_run:
    - test
    steps:
    # steps to deploy
    after_run:
    - send-notifications
</code></pre>
<p>In the above example, if you run:</p>
<ul>
<li><code>bitrise run send-notifications</code> : only the steps of the <code>send-notifications</code> workflow will be executed</li>
<li><code>bitrise run setup</code> : only the steps of the <code>setup</code> workflow will be executed</li>
<li><code>bitrise run test</code> : first the steps of the <code>setup</code> workflow will be executed,
then the steps declared in <code>test</code> workflow</li>
<li><code>bitrise run ci</code>: will execute the steps of the workflows, in the following order:
<ol>
<li><code>setup</code></li>
<li><code>test</code></li>
<li><code>ci</code> (the <code>ci</code> workflow doesn't have any steps, but that's not an issue, it just means
that no step will be executed here, the build will continue with the next workflow in the chain)</li>
<li><code>send-notifications</code></li>
</ol>
</li>
<li><code>bitrise run deploy</code>: will execute the steps of the workflows, in the following order:
<ol>
<li><code>setup</code></li>
<li><code>test</code></li>
<li><code>deploy</code></li>
<li><code>send-notifications</code></li>
</ol>
</li>
</ul>
<p>This means that you can define what a <code>setup</code> and <code>test</code> should do
in your project only once, in the <code>setup</code> and <code>test</code> workflows,
and then you can resuse those in other workflows.
There's no need to duplicate steps between workflows.</p>
<p>When you chain workflows, technically it's the same as if you'd create
one workflow which would include all steps from all the workflows
chained after each other. This means that, for example,
one step's outputs will be available for
every other step which is executed after that step during the build,
regardless of whether the other step is
in the same or in another workflow; if a step is executed
after another one during the build, it can access the outputs
of the previous steps. Just like if both steps would be in a single workflow.</p>
<h3>Note about workflow environment variables</h3>
<p>Workflow specific environment variables are made accessible
<strong>when the workflow is executed</strong>, and are available for workflows
executed <em>after</em> that workflow, <em>but not in the ones executed before</em> that workflow.</p>
<p>Using the example above, if you <code>bitrise run ci</code>,
the <code>IS_TEST</code> environment variable <strong>won't</strong> be available in the <code>setup</code>
workflow, as that runs <em>before</em> the <code>test</code> workflow,
but the environment variable <strong>will</strong> be available for the steps in <code>test</code>, <code>ci</code> and
<code>send-notifications</code> workflows.</p>
<p>This is true even if the workflow doesn't have any steps.
This can be utilized if you want to create generic workflows,
which can do different things based on environment variables,
and you specify those environment variables through a &quot;wrapper&quot; workflow.</p>
<p>Example:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:

  generic-build:
    steps:
    # steps which depend on `BUILD_TYPE` environment variable

  build-alpha:
    envs:
    - BUILD_TYPE: alpha
    after_run:
    - generic-build

  build-beta:
    envs:
    - BUILD_TYPE: beta
    after_run:
    - generic-build
</code></pre>
<p><code>build-alpha</code> nor <code>build-beta</code> has any steps, the steps are defined in <code>generic-build</code>,
but when you <code>bitrise run build-alpha</code> the <code>BUILD_TYPE</code> environment variable will be set to <code>alpha</code>,
while if you <code>bitrise run build-beta</code>  the <code>BUILD_TYPE</code> environment variable will be set to <code>beta</code>.</p>
<p><strong>Important:</strong> as noted above, workflow defined environment variables are
only available in the workflow it defines it, and the ones <strong>executed after</strong> that workflow.
In the example above <code>generic-build</code> is included as <code>after_run</code> workflow,
so the <code>BUILD_TYPE</code> environment variable will be available in the steps of <code>generic-build</code>.
But if you'd use <code>before_run</code> instead of <code>after_run</code>, that would mean that technically
the steps of <code>generic-build</code> are processed and executed before processing
the <code>build-alpha</code> or <code>build-beta</code> workflows, so the <code>BUILD_TYPE</code> environment
variable would not be available in the step of <code>generic-build</code>.</p>
<h2>Utility workflows</h2>
<p>Utility workflows are just a small trick to help you organize your workflows.</p>
<p>If you rely on workflow chaining, you might quickly have tons of small,
reusable workflows. Finding the right workflow might get tricky.</p>
<p>To help with this, the Bitrise CLI supports a small notation called
&quot;utility workflows&quot;.</p>
<p><strong>A workflow is considered as a utility workflow if it's ID starts
with an underscore character (for example <code>_setup</code>).</strong></p>
<p>Utility workflows are listed at the end of the workflow list if you
run <code>bitrise run</code> or <code>bitrise workflows</code>, and
<strong>utility workflows can't be executed directly with a <code>bitrise run</code></strong>.</p>
<p>These workflows can still be referenced in <code>before_run</code> and <code>after_run</code>
lists of course, and <strong>there's absolutely no other difference
compared to a regular workflow</strong>.</p>
<p>Using the above example where there were five workflows
(<code>ci</code>, <code>deploy</code>, <code>send-notifications</code>, <code>setup</code> and <code>test</code>),
if you run <code>bitrise run</code> in the directory of the <code>bitrise.yml</code>
(just <code>bitrise run</code>, without specifying a workflow)
you'll get a single list of all five workflows:</p>
<pre><code>The following workflows are available:
 * ci
 * deploy
 * send-notifications
 * setup
 * test

You can run a selected workflow with:
$ bitrise run WORKFLOW-ID
</code></pre>
<p>You most likely don't want to run <code>setup</code>, <code>test</code> nor <code>send-notifications</code>
by itself, only through <code>ci</code> or <code>deploy</code>, so if you prefix those
with an underscore character to make them utility workflows,
the <code>bitrise run</code> output will better highlight which workflows
are meant to be executed directly:</p>
<pre><code>The following workflows are available:
 * ci
 * deploy

You can run a selected workflow with:
$ bitrise run WORKFLOW-ID


The following utility workflows are defined:
 * _send-notifications
 * _setup
 * _test

Note about utility workflows:
 Utility workflow names start with '_' (example: _my_utility_workflow).
 These workflows can't be triggered directly, but can be used by other workflows
 in the before_run and after_run lists.
</code></pre>
<h2>Full spec / list of available properties</h2>
<p>You can find the complete list of available properties in the
<a href="https://github.com/bitrise-io/bitrise/blob/master/_docs/bitrise-yml-format-spec.md">bitrise.yml format specification / reference</a>
docs of the CLI.</p>
