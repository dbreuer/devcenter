<p>Having more time to be creative is the key to great inventions.
We believe that giving developers the chance to work without distractions is the most important thing that can lead to extraordinary creations.
Our mission is to provide a platform that lets you concentrate on the process of creation,
instead of the administrative tasks that get in the way of it.</p>
<p>That's why we created Bitrise. But we're not alone in this!
We love how <a href="https://krausefx.com">Felix Krause</a> sought to solve this problem by
creating <a href="https://fastlane.tools">fastlane</a>. So by the combined force of earth, water, fire and wind…
we integrated the whole <a href="https://fastlane.tools">fastlane toolkit</a> - booyah! How cool is that!</p>
<p>!!! note &quot;Bitrise offline CLI&quot;
We have an open source, offline CLI, which can be used in a similar way as <em>fastlane</em>.
If you're interested, you can find the CLI's website <a href="https://www.bitrise.io/cli">here</a>,
and its GitHub repository <a href="https://github.com/bitrise-io/bitrise">here</a>.
You can use this CLI to run your bitrise configurations locally, which can
include runing <em>fastlane</em> too as part of the build, as described below ;)</p>
<h2>What is fastlane?</h2>
<p><em>fastlane</em> lets you define and run your deployment pipelines for different environments.
It helps you unify and automate your app's release process.
<em>fastlane</em> connects all <code>fastlane tools</code> and third party tools, like CocoaPods and xctool.</p>
<p><em>fastlane</em> is a collection of ruby gems that cover the most usual tasks required during iOS app development
and upload or update to the App Store.</p>
<h2>How to get started?</h2>
<p>Using <em>fastlane</em> for your workflow is easy as pie. Just <a href="/getting-started/manage-your-bitrise-workflow">add the <code>Fastlane</code> step to your
workflow</a>,
after the <code>Git Clone</code> step (and any other dependency step).</p>
<p>!!! note
You should also add/keep the <code>Certificate and profile installer</code> step in the workflow,
to download your <em>.p12 Certificates</em> and <em>Provisioning Profiles</em> uploaded to <a href="https://www.bitrise.io">bitrise.io</a>
and to install them. <strong>Even if you don't upload your files to <a href="https://www.bitrise.io">bitrise.io</a>
and instead you use a fastlane tool to manage your code signing files you should
still keep this step in the workflow</strong>. Read more about <a href="/ios/code-signing/#use-a-third-party-tool-to-manage-your-code-signing-files">iOS Code Signing using
third party tools</a>.</p>
<p>With adding the <em>fastlane</em> step we ensure that you are running on the latest <em>fastlane</em> version,
as it is pre-installed on all our VMs.
Inside the step you can set the <em>fastlane</em> action and we will run it automatically every time you push a new code change.</p>
<p>For more configuration options see the <code>Fastlane</code> step's description in the Workflow Editor!</p>
<p>!!! note
If you want to use <a href="https://www.bitrise.io">bitrise.io</a> to store your code signing files,
you should just follow the <a href="/ios/code-signing/">iOS Code Signing guide here</a>.</p>
<h2>What's next?</h2>
<p><em>fastlane</em>'s greatness comes from its ability to define different lanes for your different deployment needs - hence the name.
You can combine this with Bitrise and run separate lanes for separate branches, automatically.
For example you can run a lane for every code push onto the <code>master</code> branch to update your
screenshots and metadata on the App Store and to release the distribution version,
and a separate lane for the <code>develop</code> branch to deploy your test releases
and all the others to ensure that nobody has broken anything.
You can simply clone the workflow as many times as you want to,
and use the <code>Trigger</code> feature of <a href="https://www.bitrise.io">bitrise.io</a> to define
which Workflow to be selected for this branch / tag / pull request.
You can find more information about the Triggers feature in the
<a href="/webhooks/trigger-map/">Control what to build when, with the Trigger Map</a> guide.</p>
<p>We hope that you are as happy as we are to have this amazing tool inside Bitrise. Go ahead and try it out!</p>
<p>And as always, happy building!</p>
