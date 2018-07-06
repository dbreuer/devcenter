<p>You can send <a href="https://www.hipchat.com/">HipChat</a> messages during your build.</p>
<p>You can, for example, send a <code>HipChat</code> message with the Build's <a href="https://www.bitrise.io">bitrise.io</a> URL,
the build's status (at the point where you include the HipChat step - usually it's best to
make it the very last step of the Workflow) and with the Public Install Page for the app.</p>
<p>To do this all you have to do is:</p>
<ol>
<li>add a <code>Send HipChat message</code> step to your app's Workflow, after the <code>Deploy to Bitrise.io step</code>,</li>
<li>fill out the required inputs (authentication token, the room's ID you want to send the message to,
color of the message, ...),</li>
<li>and in the <em>Message</em> input field you can include environment variables
defined by Bitrise and by the steps which run before the HipChat Message step.</li>
</ol>
<p>!!! note
If you click into any Step input field, an <strong>Insert Variable</strong> button will appear.
With this you can insert environment variables defined by Bitrise
(for example the App's title, the Build's unique ID or the Build's URL on Bitrise)
and environment variables exported by Steps which ran before this step
(for example an Xcode Build's status or the generated IPA path).</p>
<p>Fill out the HipChat steps' required input fields, and for the HipChat Message
step's <code>Message</code> input include the build's url with the <code>$BITRISE_BUILD_URL</code> environment variable,
the build's status at that point with the <code>$BITRISE_BUILD_STATUS</code> variable,
and the related Public Install Page URL with <code>$BITRISE_PUBLIC_INSTALL_PAGE_URL</code>.</p>
<p>An example <code>Message</code> input:</p>
<pre><code>Your build's details can be found at: $BITRISE_BUILD_URL,
and the Public Install page at: $BITRISE_PUBLIC_INSTALL_PAGE_URL

Build status: $BITRISE_BUILD_STATUS
</code></pre>
<p>That's all. Once you configure your Workflow this way and start a new build,
you'll be notified about the build and deploy on HipChat,
including both the build's details url and the app's Public Install Page url.</p>
