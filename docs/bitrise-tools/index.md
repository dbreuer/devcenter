<p>List of Open Source tools maintained by the Bitrise team.</p>
<p>!!! note &quot;Where can I find the repositories?&quot;
For historical reasons the core Bitrise CLI tools live in <a href="https://github.com/bitrise-io">github.com/bitrise-io</a>,
but most of our tools, and every new tool we create lives in
the <a href="https://github.com/bitrise-tools">github.com/bitrise-tools</a>,
and the CLI core components (plugins, etc.)
in the <a href="https://github.com/bitrise-core">github.com/bitrise-core</a> GitHub organization.</p>
<h2>Core, Bitrise CLI tools</h2>
<ul>
<li><a href="https://github.com/bitrise-io/bitrise">bitrise</a> -
the Bitrise CLI, which is used on <a href="https://www.bitrise.io">bitrise.io</a>
to run the builds, as well as you can install it on your own Mac/Linux and run your the build locally!</li>
<li><a href="https://github.com/bitrise-io/stepman">stepman</a> -
used for managing the Step Library, including
downloading and sharing steps.</li>
<li><a href="https://github.com/bitrise-io/bitrise">envman</a> -
environment variable manager, can be used independently
and Bitrise CLI uses it to isolate and manage environment variables during the build.</li>
</ul>
<h2>Bitrise CLI plugins</h2>
<ul>
<li><a href="https://github.com/bitrise-core/bitrise-plugins-analytics">Analytics plugin</a></li>
</ul>
<h2>Infrastructure</h2>
<ul>
<li><a href="https://github.com/bitrise-tools/bitrise-machine">bitrise-machine</a> -
Manage bitrise CLI runner hosts (virtual machines). Create, destroy, cleanup based on configuration.</li>
<li><a href="https://github.com/bitrise-tools/bitrise-bridge">bitrise-bridge</a> -
Responsible for &quot;bridging&quot; a Bitrise CLI command
from a remote host to the local Bitrise CLI;
either directly or by creating a Docker container and running the Bitrise CLI command in it.</li>
<li><a href="https://github.com/bitrise-io/cmd-bridge">cmd-bridge</a> -
Helps bridging an outside (generic) command (e.g. any command, through SSH) into a host. Useful in cases
where the command have to be performed in a specific environment, e.g. the iOS Simulator
can't be started from an SSH session, it have to be started from a logged in &quot;GUI&quot; user.
In this case you start <code>cmd-bridge</code>'s server in the environment, and then
you can use <code>cmd-bridge</code> through SSH or another way to send commands to the running
<code>cmd-bridge</code> server, which will perform the commands in its context / the environment
it is running in.</li>
<li><a href="https://github.com/bitrise-tools/garden">garden</a> -
A tool to manage your template (plan) based directories.
You can perform a setup (plant) by running garden grow,
which'll create your garden (directories) based on your plans (temlates).</li>
</ul>
<h2>iOS</h2>
<ul>
<li><a href="https://github.com/bitrise-tools/codesigndoc">codesigndoc</a> -
Your friendly iOS Code Signing Doctor.</li>
</ul>
<h2>Generic</h2>
<ul>
<li><a href="https://github.com/bitrise-tools/depman">depman</a> -
Super Simple Dependency Manager</li>
<li><a href="https://github.com/bitrise-tools/releaseman">releaseman</a> -
Your friendly Release Manager</li>
</ul>
<h2>Go</h2>
<p>Go / golang related tools.</p>
<ul>
<li><a href="https://github.com/bitrise-tools/gows">gows</a> -
Go Workspace / Environment Manager, to easily manage the Go Workspace during development.</li>
<li><a href="https://github.com/bitrise-tools/goinst">goinst</a> -
Go Install command line tools in an isolated environment.</li>
</ul>
<h2>Server / service</h2>
<ul>
<li><a href="https://github.com/bitrise-io/bitrise-webhooks">bitrise webhooks</a> -
Bitrise Webhooks processor. Transforms various incoming webhooks (GitHub, Bitbucket, Slack, ...)
to <a href="https://www.bitrise.io">bitrise.io</a>'s Build Trigger API format, and calls it to start a build.</li>
<li><a href="https://github.com/bitrise-tools/datapi">DATapi</a> -
A very simple data series storage service.
Store and retrieve data series in a quick and simple way, based on timestamp and category of the data.
<ul>
<li><a href="https://github.com/bitrise-tools/datapi-client">DATapi Ruby Client</a></li>
</ul>
</li>
</ul>
