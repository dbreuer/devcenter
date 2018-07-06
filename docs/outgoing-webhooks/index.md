<p>By setting up outgoing webhooks you can make Bitrise send notifications about specific events to your web service, so you can create custom integrations.</p>
<p>You can set the URL of your web service and select which events should trigger a notification in the Code tab of your app. Currently only build events are supported: a notification is sent when a build starts or finishes.</p>
<p>The event type that triggered the webhook is sent in a custom header:</p>
<pre><code>&quot;Bitrise-Event-Type&quot;: &quot;build/triggered&quot; # or &quot;build/finished&quot;
</code></pre>
<p>The recent delivery attempts of a webhook can be found on the Code tab, so you can inspect the sent payload and the given response, and even request a redelivery of a given item. (Please note that Bitrise tries to deliver an item only once, no automatic retry attempts are made: it can be requested manually.)</p>
<h2>Build events</h2>
<p><em>Note: the available values of the build status parameter can be found at the <a href="/api/v0.1/#get-appsapp-slugbuilds">build list part of the Bitrise API documentation</a></em></p>
<h3>Build triggered</h3>
<p>Custom header:</p>
<pre><code>&quot;Bitrise-Event-Type&quot;: &quot;build/triggered&quot;
</code></pre>
<p>Payload example:</p>
<pre><code>{
  &quot;build_slug&quot;:&quot;1234abcd&quot;,
  &quot;build_number&quot;:3,
  &quot;app_slug&quot;:&quot;abcd1234&quot;,
  &quot;build_status&quot;:0,
  &quot;git&quot;: {
    &quot;provider&quot;:&quot;github&quot;,
    &quot;src_branch&quot;:&quot;feature/branch&quot;,
    &quot;dst_branch&quot;:&quot;master&quot;, # If the build was triggered by a pull request
    &quot;pull_request_id&quot;:32, # If the build was triggered by a pull request
    &quot;tag&quot;:&quot;v1.0&quot; # If the build was triggered by tag
  }
}
</code></pre>
<h3>Build finished</h3>
<p>Custom header:</p>
<pre><code>&quot;Bitrise-Event-Type&quot;: &quot;build/finished&quot;
</code></pre>
<p>Payload example:</p>
<pre><code>{
  &quot;build_slug&quot;:&quot;1234abcd&quot;,
  &quot;build_number&quot;:3,
  &quot;app_slug&quot;:&quot;abcd1234&quot;,
  &quot;build_status&quot;:1,
  &quot;git&quot;: {
    &quot;provider&quot;:&quot;github&quot;,
    &quot;src_branch&quot;:&quot;feature/branch&quot;,
    &quot;dst_branch&quot;:master, # If the build was triggered by a pull request
    &quot;pull_request_id&quot;:32 # If the build was triggered by a pull request
    &quot;tag&quot;:&quot;v1.0&quot; # If the build was triggered by tag
  }
}
</code></pre>
