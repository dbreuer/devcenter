<p>To have Bitrise automatically start a build every time you push code into your repository you
can set up a webhook at your code hosting service which will automatically
trigger a build on Bitrise with the code you push to your repository.</p>
<p>!!! note &quot;If you have a Bitbucket webhook already set up for your app ...&quot;
If you have a Bitbucket webhook already set up for your app,
simply skip to the <a href="#choose-from-triggers"><strong>triggers</strong></a> section
and edit your current one according to the screenshot there.</p>
<h2>Get the webhook URL for Bitbucket</h2>
<p>Navigate to the <code>Code</code> tab of your app's page and select <code>Bitbucket</code> from the dropdown at the webhooks section.</p>
<p><img src="/img/webhooks/webhooks_bitbucket.png" alt="Screenshot"></p>
<p>Copy the webhook URL for the selected service.</p>
<h2>Setup webhook on Bitbucket</h2>
<p>Navigate to your Bitbucket repository and select <code>Settings</code>.</p>
<p><img src="/img/webhooks/bitbucket_settings.png" alt="Screenshot"></p>
<p>Select <code>Webhooks</code> from the left.</p>
<p><img src="/img/webhooks/bitbucket_settings_webhooks.png" alt="Screenshot"></p>
<p>Select <code>Add Webhook</code></p>
<p><img src="/img/webhooks/bitbucket_add_webhooks.png" alt="Screenshot"></p>
<p>Paste the Bitbucket Webhook URL from Bitrise to the <code>URL</code> and add a <code>Title</code>.</p>
<p><img src="/img/webhooks/bitbucket_webhook_info.png" alt="Screenshot"></p>
<h3>Choose from triggers</h3>
<p>Select <code>Choose from a full list of triggers</code>.</p>
<p><img src="/img/webhooks/bitbucket_webhook_trigger.png" alt="Screenshot"></p>
<p>Select Repository <code>Push</code> and Pull Request <code>Created</code> and <code>Updated</code> triggers. After you are ready press the <code>Save</code> button and you are ready to roll!</p>
<p><img src="/img/webhooks/bitbucket_webhook_push_and_pr.png" alt="Screenshot"></p>
