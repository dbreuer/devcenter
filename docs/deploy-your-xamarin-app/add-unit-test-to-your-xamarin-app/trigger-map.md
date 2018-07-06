<p>Now that you have a <a href="/webhooks/">webhook registered</a>,
the next step is to define when to build what.</p>
<p>When you register a webhook for an event or for multiple events (e.g. for <code>Code Push</code> and
for <code>Pull Request</code> events), your source code hosting service will call the webhook
every time the related event happens.</p>
<p>On <a href="https://www.bitrise.io">bitrise.io</a> these webhooks calls are called &quot;triggers&quot;,
and can be mapped to different <code>Workflows</code>, or not mapped at all.
If you don't map a trigger to any workflow, then <a href="https://www.bitrise.io">bitrise.io</a> won't
start a build. If you map it to a workflow, then a build will be started
with the selected workflow.</p>
<p>In the following examples we'll use a very simple Bitrise configuration (<code>bitrise.yml</code>),
which does nothing else just prints the selected workflow's ID:</p>
<pre><code class="language-yaml">---
format_version: 1.3.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- push_branch: &quot;*&quot;
  workflow: primary
- pull_request_target_branch: &quot;*&quot;
  pull_request_source_branch: &quot;*&quot;
  workflow: primary
- tag: &quot;*&quot;
  workflow: primary
workflows:
  primary:
    steps:
    - script:
        inputs:
        - content: |-
            #!/bin/bash
            echo &quot;$BITRISE_TRIGGERED_WORKFLOW_ID&quot;
</code></pre>
<p>!!! note &quot;What is bitrise.yml?&quot;
<code>bitrise.yml</code> is the representation of your app's configuration.
In the workflow editor you can edit it in a visual way through the web UI,
but you can always switch to <code>bitrise.yml</code> mode (left side of the workflow editor)
to see the configuration in a YAML format, as well as you can edit the configuration
in YAML format too. It's up to you which solution you prefer, the visual web UI
or the YAML (<code>bitrise.yml</code>) representation, and you can switch between the two
any time (the changes you do in the web UI will be reflected in the <code>bitrise.yml</code>,
and vice versa).</p>
<p>The above example <code>bitrise.yml</code> will select the <code>primary</code> branch for every Code Push (<code>push_branch: &quot;*&quot;</code>), Tag Push (<code>tag: &quot;*&quot;</code>)
and for every Pull Request (<code>pull_request_target_branch: &quot;*&quot;</code> &amp; <code>pull_request_source_branch: &quot;*&quot;</code>).</p>
<p><em>If you remove the pull request item</em> from the <code>trigger_map</code> list, then
no pull request will trigger a build anymore. Example:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<p>This configuration will start a build with the <code>primary</code> workflow
for every code push, but for nothing else (e.g. not for pull requests).</p>
<h2>&quot;Components&quot; of the <code>trigger_map</code></h2>
<p>A <code>trigger_map</code> is a <em>list of filters</em>, and the <code>workflow</code> the given
filters should select in case of a matching trigger.</p>
<p><strong>Every filter item has to include at least one condition!</strong></p>
<p>This means that you can't have an item which only specifies the <code>workflow</code>,
at least one filter (<code>push_branch</code> / <code>pull_request_source_branch</code> / <code>pull_request_target_branch</code> / <code>tag</code>)
has to be specified!</p>
<h3>The available filters:</h3>
<ul>
<li><code>push_branch</code> : A filter which is matched against Code Push events' &quot;branch&quot; parameter</li>
<li><code>pull_request_source_branch</code> : A filter which is matched against Pull Request events' &quot;source branch&quot;
parameter (the branch the pull request was started from)</li>
<li><code>pull_request_target_branch</code> : A filter which is matched against Pull Request events' &quot;target branch&quot;
parameter - the branch the pull request will be <strong>merged into</strong></li>
<li><code>tag</code> : A filter which is matched against Tag Push events' &quot;tag&quot; (name) parameter</li>
<li><code>pattern</code> : <strong>DEPRECATED</strong> - this filter was used for both code push and pull request events,
in combination with <code>is_pull_request_allowed</code>. This filter is now deprecated,
as the new filters allow better control over event mapping.</li>
</ul>
<p>If you define multiple filters in a single item then <strong>all filters have to match</strong>
in order to select that item's workflow.
For example:</p>
<pre><code>trigger_map:
- pull_request_target_branch: &quot;master&quot;
  pull_request_source_branch: &quot;develop&quot;
  workflow: primary
</code></pre>
<p>will only select the <code>primary</code> workflow if the pull request's source branch is <code>develop</code> <strong>AND</strong>
the target branch is <code>master</code>.</p>
<p>If you want to specify filters which should be treated separately, e.g. to
select <code>primary</code> for pull requests where the source is <code>develop</code>, as well as select
for the ones which target <code>master</code>:</p>
<pre><code>trigger_map:
- pull_request_target_branch: &quot;master&quot;
  workflow: primary
- pull_request_source_branch: &quot;develop&quot;
  workflow: primary
</code></pre>
<p>One last note, which is hopefully not surprising after the previous example:
you can't mix and match <code>push_branch</code>, <code>tag</code> and the <code>pull_request_..</code> filters <strong>in the same item</strong>.
This would effectively mean that the workflow should be selected
if the event is a Code Push and a Pull Request (or Tag Push) event <strong>at the same time</strong>.
This is simply not possible, source code hosting services send separate
webhooks for Pull Request (pre-merge state), Tags and for Code Push events.
<em>A single webhook event will never be Code Push, Tag Push and Pull Request at the same time</em>,
a single webhook is always related to only one type (Code Push, Tag Push or Pull Request).</p>
<h2>One trigger = one build</h2>
<p>One trigger can only select a single workflow / can only start a single build.
<strong>The first item which matches the trigger will select the workflow for the build!</strong></p>
<p><strong>If you want to run more than one workflow</strong>, you can
<a href="/bitrise-cli/workflows/#chaining-workflows-and-reusing-workflows">Chaining workflows</a>
after each other. <em>The workflows chained this way won't run in parallel</em>,
but the full chain of workflows will be executed, in the order you chain them.</p>
<p><strong>The order of the items</strong> also matter: if you'd specify a <code>push_branch: master</code> item <strong>after</strong> a
<code>push_branch: &quot;*&quot;</code> item, the <code>push_branch: master</code> <em>would never be selected</em>
as every code push event would match <code>push_branch: &quot;*&quot;</code> first,
and <strong>the first item which matches the trigger will select the workflow for the build!</strong></p>
<h2>How to build only a single branch</h2>
<p>If you want to build only a single branch, for every code push, but for nothing else (no push to
any other branch should trigger a build, nor any pull request or tag), then
all you have to do is to specify a <code>trigger_map</code> which does not map anything else
to any workflow, only the branch you want to build.</p>
<p>E.g. if you only want to build the <code>master</code> branch on code push:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: primary
</code></pre>
<p>Or if you only want to build <code>feature/</code> branches:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: feature/*
  workflow: primary
</code></pre>
<p>Or the two together:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: primary
- push_branch: feature/*
  workflow: primary
</code></pre>
<p>This configuration will start a build for every code push which happens on
either <code>master</code> or on a <code>feature/</code> branch, and will use the same workflow for
both (<code>primary</code>).</p>
<p>If you want to use a different workflow for your <code>master</code> branch, then
all you have to do is to change the <code>workflow:</code> for that trigger map item:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: deploy
- push_branch: feature/*
  workflow: primary
</code></pre>
<p>This configuration will use the workflow <code>deploy</code> for every code push on <code>master</code>,
and the workflow <code>primary</code> for every code push on <code>feature/</code> branches,
and <strong>will not start a build for anything else</strong>.</p>
<h2>A very simple, two-workflow CI/CD setup</h2>
<p>A base CI/CD setup involves two workflows: one for integration tests,
and one for distribution.</p>
<p>If you have a workflow <code>primary</code> for doing the integration tests,
and <code>deploy</code> to do the deployment / distribution, and you want to
run the integration test for code pushes and pull requests on every branch
except the <code>master</code> branch, which should instead use the <code>deploy</code> workflow:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: deploy
- push_branch: &quot;*&quot;
  workflow: primary
- pull_request_target_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<p>!!! warning &quot;Order of the items matter!&quot;
When <code>bitrise</code> receives a webhook event (any kind) it'll match it against
the app's <code>trigger_map</code>. <strong>The first item it matches will select the workflow for the build!</strong></p>
<p>This means that if you'd specify the <code>push_branch: master</code> <strong>after</strong> the
<code>push_branch: &quot;*&quot;</code> item, <code>master</code> would never be selected as every code push
event would match <code>push_branch: &quot;*&quot;</code> first!</p>
<h2>Don't start two builds for pull requests from the same repository</h2>
<p>When you start a Pull Request from the same repository (not from a fork,
just from a branch of the repository),
<strong>the source code hosting service will send two webhooks</strong>,
one for the code push and one for the pull request!</p>
<p>An important note: although it might seem like both builds are the same,
it most likely isn't! The code push event/build builds the code
of the branch, without any merging, etc. It builds the exact same state of the code
what you have when you checkout that branch.
The Pull Request build on the other hand builds a &quot;pre-merged&quot; state of the code,
which is expected to be the state of the code <strong>after</strong> you merged the pull request.</p>
<p>Whether you want to build both or just one of these in case of a pull request
is up to you and depends on your project's requirements, but with <code>bitrise</code>
you can decide whether you want it or not.</p>
<p>!!! note &quot;Pull Request merge is actually a Code Push!&quot;
Source code hosting services treat the event of &quot;merge&quot; as a code push
event. For example if you merge a Pull Request from <code>feature/a</code> into <code>master</code>,
when you merge the PR it will generate a code push to <code>master</code>.</p>
<p>An example to build only the pull request (&quot;pre-merged&quot;) events/state,
in addition to deploying <code>master</code>:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: deploy
- pull_request_target_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<p>or if you don't want to start a build for pull requests, only for code push events:</p>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: deploy
- push_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<h2>Three workflows: test, deploy to staging and deploy to production</h2>
<p>Another common CI/CD pattern is to have three workflows:</p>
<ul>
<li>A Test workflow, which will run for every pull request, every code push on <code>feature/</code> branches etc.,
to test whether the test can be integrated into a release (branch)</li>
<li>A Staging deployment workflow, to deploy the app/code to an internal/testing system. Examples:
<ul>
<li>In case of an iOS app this can be e.g. an Ad Hoc signed IPA deployed to HockeyApp, where your tester team can
download and test it, or a deploy to iTunes Connect / TestFlight for internal testing.</li>
<li>In case of an Android app this can be a deploy to Google Play to a &quot;beta&quot; track.</li>
<li>In case of a server code this can be a deploy to e.g. a staging Heroku server.</li>
</ul>
</li>
<li>A Production deployment workflow, to deploy the app/code into production. Examples:
<ul>
<li>In case of an iOS app this can be an App Store signed IPA deployed to iTunes Connect/TestFlight,
enabled for &quot;external testing&quot;.</li>
<li>In case of an Android app this can be a deploy to Google Play as a public update of the app.</li>
<li>In case of a server code this can be a deploy to e.g. the production Heroku server.</li>
</ul>
</li>
</ul>
<p>So, we have three workflows (<code>primary</code> (test), <code>deploy-to-staging</code> and <code>deploy-to-production</code>)
and we'll specify three triggers, to select the right workflow for the right trigger.</p>
<p>There are two similar approaches, depending whether you prefer tags of branches for
production deployment:</p>
<h3>Using Tags to trigger the production deployment</h3>
<pre><code class="language-yaml">trigger_map:
- tag: v*.*.*
  workflow: deploy-to-production
- push_branch: master
  workflow: deploy-to-staging
- push_branch: &quot;*&quot;
  workflow: primary
- pull_request_target_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<p>This trigger map configuration will trigger a build:</p>
<ul>
<li>with the <code>deploy-to-production</code> workflow if a new tag (with the format <code>v*.*.*</code>, e.g. <code>v1.0.0</code>) is pushed</li>
<li>with the <code>deploy-to-staging</code> workflow if a code push happens on the <code>master</code> branch (e.g. a pull request is merged into the <code>master</code> branch)</li>
<li>with the <code>primary</code> workflow for any other branch and for pull requests</li>
</ul>
<h3>Using a Branch to trigger the production deployment</h3>
<pre><code class="language-yaml">trigger_map:
- push_branch: master
  workflow: deploy-to-production
- push_branch: develop
  workflow: deploy-to-staging
- push_branch: &quot;*&quot;
  workflow: primary
- pull_request_target_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<p>This trigger map configuration will trigger a build:</p>
<ul>
<li>with the <code>deploy-to-production</code> workflow if a code push happens on the <code>master</code> branch (e.g. a git flow release branch merged into <code>master</code>)</li>
<li>with the <code>deploy-to-staging</code> workflow if a code push happens on the <code>develop</code> branch (e.g. a pull request is merged into the <code>develop</code> branch)</li>
<li>with the <code>primary</code> workflow for any other branch and for pull requests</li>
</ul>
<h2>How to build only pull requests</h2>
<p>If all you want is to run integration tests for pull requests, and you
don't want to do anything else, then you can use a trigger map configuration
like this:</p>
<pre><code class="language-yaml">trigger_map:
- pull_request_target_branch: &quot;*&quot;
  workflow: primary
</code></pre>
<p>This will select the <code>primary</code> workflow for every and any pull request,
and will not start a build for anything else.</p>
<p>If you'd only want to build pull requests which are targeted to
be merged into <code>master</code>, the configuration would look like this:</p>
<pre><code class="language-yaml">trigger_map:
- pull_request_target_branch: master
  workflow: primary
</code></pre>
