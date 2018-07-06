<p>Installing the Bitrise CLI is super simple.</p>
<p>The Bitrise CLI is distributed as a single binary, so
you just have to download this binary file, make it executable,
and run <code>bitrise setup</code> to download all the core plugins
and tools required for running a build.</p>
<p><em>If you'd forget to run <code>bitrise setup</code> that's not an issue either,
the first time you run <code>bitrise run</code> it will perform the <code>setup</code>
if it was not performed for the current version of the CLI yet.
<code>bitrise setup</code> can be called any time to validate the CLI installation.</em></p>
<p>Upgrading the CLI works exactly the same way: just download the
new binary (overwrite the previous binary), make it executable
and run <code>bitrise setup</code> (or the next <code>bitrise run</code> will run it
automatically).</p>
<p>You can download the release binary on GitHub from the CLI's
<a href="https://github.com/bitrise-io/bitrise/releases">releases</a> page.
Every release includes copy paste ready <code>curl</code> commands
to install the specific version.</p>
<p>The CLI is also available in <a href="http://brew.sh/">brew</a> on macOS, so it can be installed with</p>
<pre><code>brew update &amp;&amp; brew install bitrise
</code></pre>
<p>if you have Homebrew installed on your Mac.</p>
<p>You can find more information about the installation in the
<a href="https://github.com/bitrise-io/bitrise#install-and-setup">Install and Setup section of the CLI's README</a>.</p>
