<h2>Easiest way to export code signing identities</h2>
<p>You can easily locate the needed certificates and provisioning profiles for your project with our <code>codesigndoc</code> tool.</p>
<p>Simply open your <code>Terminal.app</code> on your Mac and
<a href="https://github.com/bitrise-tools/codesigndoc#one-liner">run the one liner &quot;install&quot; command</a>.</p>
<p>After that open your <code>Finder.app</code> and drag-and-drop your project's <code>.xcodeproj</code> or <code>.xcworkspace</code> file into the command line in your terminal.
<img src="/img/ios/codesigndoc.png" alt="codesigndoc">
Once it's done you'll have all the required files exported, ready for upload.</p>
<h2>Uploading the exported code signing files to Bitrise</h2>
<p>Once you have all the needed files, head to your dashboard on <a href="https://www.bitrise.io">bitrise.io</a> and select your app.</p>
<p>Go to <strong>Workflow</strong> &gt; <strong>Manage Workflows</strong> &gt; and select the <strong>Code Signing &amp; Files</strong> tab on the left.
Upload your code signing certificate (p12) and provisioning profiles and you are ready to go! 🚀</p>
