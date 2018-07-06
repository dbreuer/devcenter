<p>Creating your own Step is as simple as running a <code>bitrise</code> CLI (v1.6.1+) command and following the guide it prints.</p>
<p><strong>Please make sure that you have at least v1.6.1 of the CLI installed on your Mac/Linux, the step plugin was introduced as a core plugin in that version (related announcement post: <a href="https://discuss.bitrise.io/t/monthly-release-of-bitrise-cli-tools-and-summary-of-updates-may-2017-cli-v1-6-1/1690">https://discuss.bitrise.io/t/monthly-release-of-bitrise-cli-tools-and-summary-of-updates-may-2017-cli-v1-6-1/1690</a>).</strong></p>
<ul>
<li>If you don't have the <code>bitrise</code> CLI installed you can find the installation guide <a href="/bitrise-cli/installation/">here</a></li>
<li>You can find the <code>step</code> plugin's development discussion thread at <a href="https://discuss.bitrise.io/t/step-create-plugin-quickly-generate-a-new-step/1609">https://discuss.bitrise.io/t/step-create-plugin-quickly-generate-a-new-step/1609</a></li>
</ul>
<p>Once you have the Bitrise CLI installed, to generate a new Bitrise Step all you have to do is:</p>
<pre><code># If this is the very first time you use the CLI / if you just installed the CLI run this:
bitrise setup

# If you want to update the step plugin to the latest version:
bitrise plugin update step

# And to generate a new step simply run this command and follow the guide it prints:
bitrise :step create
</code></pre>
<p>The generated Step's README also describes how you can run your step locally,
before you'd even commit the code, as well as how you can test and use your step
in any build by using <a href="/bitrise-cli/steps/#special-step-sources">the <code>git::</code> step reference</a>, and finally (and optionally)
how you can share your step with others through the Bitrise StepLib.</p>
<p>If you'd have any questions visit our <a href="https://discuss.bitrise.io/">community discussion site</a> or <a href="https://www.bitrise.io/contact">contact us</a>!</p>
<p><strong>Need some inspiration for a new step idea?</strong> Look no further, we have a list! <a href="https://discuss.bitrise.io/search?q=tags%3Acontrib-this-feature%20tag%3Astep">This way please</a> :)</p>
