<h1>Builds &amp; Workflows</h1>
<p>A <em>build</em> is the process specified by the app's <em>workflow</em>, which is a collection of <em>steps</em>.
Every step is an <strong>open source</strong> repository which you can inspect, modify,
and run with the <a href="https://www.bitrise.io/cli">open source Bitrise CLI</a>.</p>
<p>The app's build configuration can be specified as a <code>yaml</code> (<code>bitrise.yml</code>) config,
which you can modify in <a href="https://www.bitrise.io">bitrise.io</a>'s
graphical Workflow Editor UI (on your app's Bitrise.io page click the <code>Workflows</code> tab),
or <a href="http://blog.bitrise.io/2016/02/12/edit-your-yaml-files-like-a-boss.html">yaml editor</a> directly.</p>
<p>On the graphical UI of the Workflow editor, you are able to add, remove, and reorder the build steps.
Steps represent a block of script execution with predefined input and output variables.
Steps can be written in various languages, like bash, Go, Ruby, Swift, etc.
Read more about how the CLI, workflows and steps work in the <a href="/bitrise-cli/">Bitrise CLI and bitrise.yml</a> section.</p>
<p>When a build is running, these scripts will be downloaded and executed in the order you've defined in your workflow,
with the input parameters you set. They will produce the predefined outputs set as environment variables.</p>
<h2>The build process</h2>
<p>There are a lot of things that can be customized when working with Bitrise.
The build process has some mutable dimensions as well,
from several kind of <a href="https://bitrise-io.github.io/devcenter/webhooks/trigger-map">triggers</a>,
through different stacks and preparation types to environment variables.</p>
<ol>
<li>Trigger builds by:
<ul>
<li>clicking the <code>Build</code> button on the application's page (manual build trigger)</li>
<li>scheduling with a selected branch and frequency (runs when scheduled - you can find this option in the <code>Build</code> popup)</li>
<li><a href="https://bitrise-io.github.io/devcenter/webhooks">webhook</a> - after each code/tag push or pull request to the given branch (runs when push/pull request arrives)</li>
<li>our <code>Build Trigger API</code></li>
</ul>
</li>
<li>Environment preparation:
Once we've found a suitable machine, a virtual machine will be provisioned and prepared to run the build.
Build specific environment variables are preset, so you can use these in your steps.
You can find more information about the available <code>Stacks</code> on your app's <code>Settings</code> tab,
in the <code>Stack Selector</code> section.</li>
<li>Concurrency:
Builds over your subscription plan's concurrency count will be marked as <strong>on hold</strong>.
They will start whenever your ongoing builds are finished and you have a free build slot.
You can always <a href="https://www.bitrise.io/me/profile/pricing">purchase additional concurrencies</a> with the Pro plan
to increase the concurrent builds you can run at the same time.</li>
<li>Workflow execution:
Steps in Workflows are executed in the same order as defined in the Workflow editor of your application,
from top to bottom. You can reorder the steps by dragging.
The log each step generates will be displayed on the build's details page.</li>
<li>Cleanup:
After the execution of the build, there will be a summary of the build
created and stored on the Bitrise server and <strong>the virtual machine gets destroyed</strong>,
so your code/files woudn't fall into the wrong hands.</li>
</ol>
