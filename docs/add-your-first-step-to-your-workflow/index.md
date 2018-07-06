<p>Once you've registered an app you can start modifying its Workflow,
that is to customize how a build should work.</p>
<p>To edit your App's Workflow you should open the <code>Workflow Editor</code>:</p>
<ol>
<li>After <a href="https://www.bitrise.io">logging in</a>, select your App on your <a href="https://www.bitrise.io/dashboard">Dashboard</a></li>
<li>Select the <code>Workflow</code> tab</li>
</ol>
<p>In the Workflow Editor you can see a preset list of Steps based on your app we added to your Workflow.</p>
<h2>Add a new Step to the Workflow</h2>
<p>If you want to <strong>add a new Step</strong> to the Workflow,
just click the <code>+</code> sign button between the Steps you want the new one to be.</p>
<p><img src="/img/getting-started/add-your-first-step.png" alt="Add step button in Workflow Editor"></p>
<p>This will show you a list of available Steps in our <strong>Step Library</strong>.
You can search and filter these steps if you want to, or just browse through the collection.
Clicking the Step will add it to your Workflow.</p>
<p>You can <strong>Drag and Drop</strong> to reorder your list of Steps. During a build,
steps will be executed one by one, in top-to-bottom order.</p>
<p>Once you're happy with your Workflow Save it on the top right!
That's all, your next build will automatically use the current, <strong>saved</strong> Workflow!</p>
<p>!!! note &quot;Multiple Workflows&quot;
You can create as many workflows as you like, and then
specify which one to use for which build trigger event in the <code>Triggers</code> section
of the Workflow Editor.
You can read more about Triggers and workflow selection in the
<a href="/webhooks/trigger-map/">Control what to build when, with the Trigger Map</a> guide.</p>
