<p>To have Bitrise automatically start a build every time you push code into your repository you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.</p>
<h2>Get the webhook URL for GitHub</h2>
<p>Navigate to the <code>Code</code> tab of your app's page and select <code>GitHub</code> from the dropdown at the webhooks section.</p>
<p><img src="/img/webhooks/github-webhook-1.png" alt="Screenshot"></p>
<p>Copy the webhook URL for the selected service.</p>
<h2>Setup webhook on GitHub</h2>
<p>Navigate to your GitHub repository and select <code>Settings</code>.</p>
<p><img src="/img/webhooks/github-webhook-2.png" alt="Screenshot"></p>
<p>Select <code>Add webhook</code> under Webhooks.</p>
<p><img src="/img/webhooks/github-webhook-3.png" alt="Screenshot"></p>
<p>Paste the GitHub Webhook URL from Bitrise to the Payload URL...</p>
<p><img src="/img/webhooks/github-webhook-4.png" alt="Screenshot"></p>
<p>And on the same page, select <code>Let me select individual events</code>.</p>
<p><img src="/img/webhooks/github-webhook-5.png" alt="Screenshot"></p>
<p>Select <code>Pull request</code> and <code>Push</code>. After you are ready press the <code>Add webhook</code> button and you are ready to roll!</p>
<p><img src="/img/webhooks/github-webhook-6.png" alt="Screenshot"></p>
