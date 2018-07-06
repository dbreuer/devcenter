<p>First of all, if you registered your app on <a href="https://www.bitrise.io">bitrise.io</a> a while ago (especially
if before 2016 Sept.) you should check the webhook URL registered on the git hosting service you use (GitHub, Bitbucket, ...).</p>
<p><strong>New trigger feature</strong> (like <a href="https://bitrise-io.github.io/devcenter/tips-and-tricks/skip-a-build/">skip ci</a> or tag based triggering)
<strong>are only available if you use the new <code>hooks.bitrise.io</code> webhook URL!</strong></p>
<p><em>Initially we had a non open source <code>bitrise.io/hooks</code> endpoint for webhooks,
but every new project registered should now get the new <code>hooks.bitrise.io</code> webhook URL automatically.</em></p>
<p><strong>If your webhook would still be a <code>bitrise.io/hooks</code> URL, please replace it with the new <code>hooks.bitrise.io/</code> URL - you can find this on the <code>Code</code> tab of your app!</strong></p>
<p><strong>Debugging - what happens with webhooks related to un-mapped branches</strong></p>
<p>You can't limit Webhooks by branch in most of the source code hosting services,
so <a href="https://www.bitrise.io">bitrise.io</a> will still receive a webhook call for every code push of other branches,
but it won't start a build unless it finds a matching filter in the <code>trigger_map</code>,
which specifies a <code>workflow</code> to be selected for the build.
<em>This is also true if you use the <strong>Build Trigger API</strong> directly.</em></p>
<p>You can see all the ignored calls on your <a href="http://www.bitrise.io/activity">Activity page on bitrise.io</a>.
This means that if you think a given event should have started a build but it did not,
you should check your <code>Activity</code> page (or your source code hosting service's Webhook history - more info a bit below)
to find out why it did not trigger a build.</p>
<p>An ignored build call entry in the Activity list looks like:</p>
<pre><code>Build trigger failed: trigger-pattern (push_branch:) (pr_source_branch:prtest/t1) (pr_target_branch:develop) did not match any defined workflow in trigger_map
PROJECT-NAME - Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found
</code></pre>
<p><strong>Bitrise also returns the reason to the source code hosting service</strong> (the service which sent the webhook, e.g. GitHub) too,
so if your service has a webhook history (e.g. GitHub, Bitbucket, ...)
you can see the reason why a given webhook did not trigger a build there too!</p>
<p>Simply open the webhook history on your source code hosting service,
and check the response Bitrise returned. It will be something like:</p>
<pre><code>{&quot;success_responses&quot;:[],&quot;failed_responses&quot;:[{&quot;status&quot;:&quot;error&quot;,&quot;message&quot;:&quot;trigger pattern did not match any defined mapping: Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found&quot;,&quot;service&quot;:&quot;bitrise&quot;,&quot;slug&quot;:&quot;...&quot;,&quot;build_slug&quot;:&quot;&quot;,&quot;build_number&quot;:0,&quot;build_url&quot;:&quot;&quot;,&quot;triggered_workflow&quot;:&quot;&quot;}]}
</code></pre>
<p><em><strong>These detailed responses are only generated if you use
the new <a href="https://hooks.bitrise.io">hooks.bitrise.io</a> webhook URL!</strong>
Initially we had a non open source <code>bitrise.io/hooks</code> endpoint
for webhooks, but every new project registered should now get the new
<code>hooks.bitrise.io</code> webhook URL automatically. If your webhook
would still be a <code>bitrise.io/hook</code> URL, please replace it with the new
<code>hooks.bitrise.io/</code> URL - you can find this on the <code>Code</code> tab of your app!</em></p>
<h2>Local debugging</h2>
<p>You can also test which workflow will be selected for a trigger
using our <a href="https://www.bitrise.io/cli">open source, Bitrise CLI</a>.</p>
<p>To simulate a code push, you can run:</p>
<pre><code>bitrise trigger-check --push-branch master
</code></pre>
<p>To simulate a Pull Request, you can run:</p>
<pre><code>bitrise trigger-check --pr-source-branch=feature/a --pr-target-branch=master
</code></pre>
<p>To simulate a tag push, you can run:</p>
<pre><code>bitrise trigger-check --tag 1.0.0
</code></pre>
<p>For more information and options run:</p>
<pre><code>bitrise trigger-check --help
</code></pre>
