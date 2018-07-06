<p>Storing the build configuration (<code>bitrise.yml</code>) in your repository can be a great idea.
It has its own PROs and CONs of course, so you have to decide it yourself
whether this solution is a good fit for your project or not.</p>
<h2>Things to keep in mind!</h2>
<p>You can find a discussion about what are the advantages and
disadvantages of this approach <a href="https://github.com/bitrise-io/bitrise.io/issues/41">on GitHub</a>.
To highlight a few things to keep in mind if you'd want to store and use
the <code>bitrise.yml</code> from your repository:</p>
<h3>Trigger Map is better to be managed on bitrise.io</h3>
<p>You can of course store the <code>trigger_map</code> (or <code>Triggers</code> on the web UI)
in your repository (in <code>bitrise.yml</code>), but if you do that you'll lose
the ability to <em>ignore</em> patterns. This is because <a href="https://www.bitrise.io">bitrise.io</a>
have to evaluate the Trigger map <strong>before</strong> the repository would be cloned
in order to be able to avoid starting a build based on the Trigger map.</p>
<p>The source code is never stored on <a href="https://www.bitrise.io">bitrise.io</a>,
(see <a href="/getting-started/code-security/#source-code">Code Security - Source code</a> for more information),
so if you store the trigger map in your repository, the only way to check it
is to clone it first. Even if you prepare your <code>trigger_map</code> in your repository to ignore
patterns, <a href="https://www.bitrise.io">bitrise.io</a> will start a build to clone
the repository, before it could abort it.</p>
<p>In contrast, if you specify the Trigger Map on <a href="https://www.bitrise.io">bitrise.io</a>,
you can ignore patterns in a way that it won't even start a build.</p>
<h3>You can't change the build configuration of a commit</h3>
<p>If you use the <code>bitrise.yml</code> from the repository, that means that when you
rebuild a specific commit, it will use the same <code>bitrise.yml</code> every time,
the one stored in the repository for that git commit.</p>
<p><em>The only way to change the configuration</em> is to checkout the related
branch, change the <code>bitrise.yml</code>, commit the changes,
push and start a <strong>new</strong> build (rebuild of a commit won't work,
that will always get the same <code>bitrise.yml</code>, the one stored at the commit).</p>
<p><strong>If you store your build configuration on <a href="https://www.bitrise.io">bitrise.io</a></strong>
you can always rebuild any commit with a new build configuration,
<em>the configuration is not tied to the commit / state of the repository</em>.
You can simply change a parameter and hit &quot;rebuild&quot;, the new build
will use the latest configuration from <a href="https://www.bitrise.io">bitrise.io</a>.</p>
<h3>You can't edit the configuration in the Workflow Editor on bitrise.io</h3>
<p>The Workflow Editor on <a href="https://www.bitrise.io">bitrise.io</a> can only be used
to visualize and edit the configuration stored on <a href="https://www.bitrise.io">bitrise.io</a>.</p>
<p>The <a href="https://github.com/bitrise-io/bitrise-workflow-editor">offline workflow editor</a>
of course can be used, so this is probably not a huge issue - and we're
working on it to make it as streamlined as possible - but might
make it harder to get started (as you have to install the Bitrise CLI
locally).</p>
<h3>Pull Requests can run builds with any custom configuration</h3>
<p>When someone sends a Pull Request they can modify the <code>bitrise.yml</code>
in your repository any way they like it. A recent trend for example
is to send pull requests which run a bitcoin miner, as long as
that's possible. This can make <em>your</em> builds to queue, until you
abort the related build or it hits the build time limit.</p>
<h2>Example to use bitrise.yml from the repository</h2>
<p>There are quite a few ways to accomplish this, as all you need is:</p>
<ol>
<li>Define a &quot;wrapper&quot; build config on <a href="https://www.bitrise.io">bitrise.io</a>,
which defines how and from where your <code>bitrise.yml</code> will be retrieved.
E.g. you could store the <code>bitrise.yml</code> in a <a href="https://gist.github.com">GitHub Gist</a>
too, not just in your repository. In this example we'll use the configuration
from the repository, so the &quot;wrapper&quot; configuration on <a href="https://www.bitrise.io">bitrise.io</a>
will define how the repository should be retrieved. Note: this also allows
more customization, for example if the repository have to be accessed through
a VPN, you can configure that in the &quot;wrapper&quot; config and it will work.</li>
<li>Run the build configuration (<code>bitrise.yml</code>) with the <a href="https://www.bitrise.io/cli">Bitrise CLI</a>.
This is the same runner which runs any other build on the <a href="https://www.bitrise.io">bitrise.io</a>
build virtual machines, so it's always preinstalled and ready to be used.</li>
</ol>
<p>The example here is really simple to setup, should work in most cases (unless
you need a VPN for cloning the repository for example), but <strong>it also requires
you to maintain the Trigger Map on <a href="https://www.bitrise.io">bitrise.io</a> instead
of in the repository</strong>, as that is the recommended solution.</p>
<p>Step by step:</p>
<ol>
<li>Create an app on <a href="https://www.bitrise.io">bitrise.io</a>, or if you already have it registered
open it.</li>
<li>Go to the <code>Workflow</code> tab to open the Workflow Editor.</li>
<li>In the Workflow Editor switch to <code>bitrise.yml</code> mode</li>
<li>In the <code>bitrise.yml</code> mode:
<ul>
<li>If you already have a configuration which you want to use, download the <code>bitrise.yml</code> first,
and save it into the <em>root</em> of your repository.
<em>There's a button to quickly download the current <code>bitrise.yml</code>.</em></li>
<li>Once you're ready to replace your configuration on bitrise.io,
copy the <a href="#bitriseyml-content-for-bitriseio">bitrise.yml content for bitrise.io</a> from below and paste
it into the editor on <a href="https://www.bitrise.io">bitrise.io</a> (in <code>bitrise.yml</code> mode of the editor)</li>
</ul>
</li>
<li>Save the changes.</li>
</ol>
<p>!!! note &quot;After downloading the original bitrise.yml from bitrise.io&quot;
The original <code>bitrise.yml</code> you downloaded from <a href="https://www.bitrise.io">bitrise.io</a>
most likely includes the steps to retrieve your repository.
These steps will be redundant, as you will define how the repository should be accessed
in the &quot;wrapper&quot; config on <a href="https://www.bitrise.io">bitrise.io</a>,
so go ahead and remove the <code>activate-ssh-key</code> and <code>git-clone</code>
steps from it before you would commit it into your repository.</p>
<h3>bitrise.yml content for bitrise.io</h3>
<pre><code>---
format_version: 1.4.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

trigger_map:
- push_branch: &quot;*&quot;
  workflow: ci
- pull_request_target_branch: &quot;*&quot;
  workflow: ci

workflows:
  _run_from_repo:
    steps:
    - activate-ssh-key:
        run_if: '{{getenv &quot;SSH_RSA_PRIVATE_KEY&quot; | ne &quot;&quot;}}'
    - git-clone: {}
    - script:
        title: continue from repo
        inputs:
        - content: |-
            #!/bin/bash
            set -ex
            bitrise run &quot;${BITRISE_TRIGGERED_WORKFLOW_ID}&quot;
  ci:
    after_run:
    - _run_from_repo

  another-workflow:
    after_run:
    - _run_from_repo

</code></pre>
<h4>How this works:</h4>
<p>This setup splits the build configuration into two parts:</p>
<ol>
<li>The &quot;wrapper&quot; config on <a href="https://www.bitrise.io">bitrise.io</a> which
<strong>defines how the repository have to be retrieved</strong> (e.g. through a Git Clone),
which workflows are exposed for <a href="https://www.bitrise.io">bitrise.io</a> builds,
and defines the automatic <a href="/webhooks/trigger-map/">Trigger mapping</a>.</li>
<li>Your build configuration (<code>bitrise.yml</code>), stored in your repository,
which <strong>defines what should happen during the builds.</strong></li>
</ol>
<p><a href="#bitriseyml-content-for-bitriseio">This &quot;wrapper&quot; configuration</a>
defines a common workflow <code>_run_from_repo</code>,
which will activate an SSH key (if specified), Git Clone the repository,
and then switch to use the <code>bitrise.yml</code> from the repository
by running <code>bitrise run &quot;${BITRISE_TRIGGERED_WORKFLOW_ID}&quot;</code>.</p>
<p>This common workflow (<code>_run_from_repo</code>) is then used through other workflows, like
<code>ci</code> and <code>another-workflow</code>, using the <code>after_run</code>
<a href="/bitrise-cli/workflows/#chaining-workflows-and-reusing-workflows">workflow chaining</a>
mechanism. Those workflows do not have any steps, the only thing
the <code>ci</code> and <code>another-workflow</code> workflows do is running the
common <code>_run_from_repo</code> workflow.</p>
<p>The trick is <code>bitrise run &quot;${BITRISE_TRIGGERED_WORKFLOW_ID}&quot;</code>.
The <code>BITRISE_TRIGGERED_WORKFLOW_ID</code> environment variable is set to the
<strong>&quot;entry&quot;</strong> workflow, <strong>the one which started the build.</strong>
So, by running the <code>ci</code> workflow, the <code>bitrise run &quot;${BITRISE_TRIGGERED_WORKFLOW_ID}&quot;</code>
command will be the same as <code>bitrise run &quot;ci&quot;</code>.</p>
<p>This makes it super simple and quick to expose workflows from your <code>bitrise.yml</code> (stored in your
repository) to <a href="https://www.bitrise.io">bitrise.io</a>, all you have to do is:</p>
<ol>
<li>Define the workflow in your <code>bitrise.yml</code> (in your repository).</li>
<li>Clone the <code>ci</code> workflow (or the <code>another-workflow</code>) with a name matching the workflow
in your <code>bitrise.yml</code> (in your repository), or create a new empty workflow
with a matching name and add the <code>_run_from_repo</code> as an <code>after_run</code> workflow.
<em>Note: in the Workflow Editor UI you can quickly clone a workflow by
selecting the workflow, then clicking the &quot;add new workflow&quot; (<code>+</code>) button.</em></li>
</ol>
<h3>Step by step usage guide of the wrapper config:</h3>
<p>For example, to add a new <code>deploy</code> workflow and to expose it for <a href="https://www.bitrise.io">bitrise.io</a> builds,
once you <a href="#bitriseyml-content-for-bitriseio">prepared your wrapper config on bitrise.io</a>:</p>
<ol>
<li>Create a <code>deploy</code> workflow <strong>in your <code>bitrise.yml</code></strong> (in your repository, and don't forget to commit and push
the <code>bitrise.yml</code> changes!)</li>
<li>Then create a new workflow with the same name (<code>deploy</code>) <strong>on <a href="https://www.bitrise.io">bitrise.io</a></strong></li>
<li>Make sure that the <code>deploy</code> workflow on <a href="https://www.bitrise.io">bitrise.io</a> has
the <code>_run_from_repo</code> as an <code>after_run</code> workflow.</li>
<li>Define <a href="/webhooks/trigger-map/">Triggers</a> for the <code>deploy</code> workflow <strong>on <a href="https://www.bitrise.io">bitrise.io</a></strong>
if you want to automate the triggering of that workflow.</li>
</ol>
<p>Following the steps above, for example to run <code>deploy</code> for every code push on <code>master</code> you should
have a configuration like this <strong>on <a href="https://www.bitrise.io">bitrise.io</a></strong>:</p>
<pre><code>---
format_version: 1.4.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

trigger_map:
- push_branch: &quot;master&quot;
  workflow: deploy
- push_branch: &quot;*&quot;
  workflow: ci
- pull_request_target_branch: &quot;*&quot;
  workflow: ci

workflows:
  _run_from_repo:
    steps:
    - activate-ssh-key:
        run_if: '{{getenv &quot;SSH_RSA_PRIVATE_KEY&quot; | ne &quot;&quot;}}'
    - git-clone: {}
    - script:
        title: continue from repo
        inputs:
        - content: |-
            #!/bin/bash
            set -ex
            bitrise run &quot;${BITRISE_TRIGGERED_WORKFLOW_ID}&quot;
  deploy:
    after_run:
    - _run_from_repo

  ci:
    after_run:
    - _run_from_repo

  another-workflow:
    after_run:
    - _run_from_repo

</code></pre>
<p>This configuration will run the <code>deploy</code> workflow <em>from your repository</em> for every
code push on the <code>master</code> branch, the <code>ci</code> workflow <em>from your repository</em> for
every code push on other branches as well as for Pull Requests,
and it will never run <code>another-workflow</code> automatically, but you will be able
to start manual builds with <code>another-workflow</code>, which will invoke
the <code>another-workflow</code> workflow <em>from the <code>bitrise.yml</code> in your repository</em>.</p>
