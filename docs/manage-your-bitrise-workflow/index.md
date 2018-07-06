<p>To start editing your workflow you first have to open it
in the <strong>Workflow Editor</strong> on Bitrise.io:</p>
<ol>
<li>Log in on <a href="https://www.bitrise.io/">Bitrise.io</a> and select your app on the Dashboard</li>
<li>Select the <code>Workflow</code> tab</li>
</ol>
<p>This is your app's <strong>Workflow Editor</strong>. You can change, delete, add and reorder steps here. Don't forget to <code>Save</code> or you can <code>Discard</code> changes on the top right._</p>
<h2>Change a step</h2>
<p>Select the step you want to change from the list on the left side.
You can change the selected Step's inputs and other configs on the right side.</p>
<p>!!! note
Steps are executed top-to-bottom, you can reorder them with <strong>Drag and Drop</strong>.</p>
<h2>Upgrade a Step to the latest version</h2>
<p>When a new version is available for a Step in your Workflow, you can update it in two ways:</p>
<ol>
<li>Click the orange dot, our update indicator in the top right of the Step's icon to upgrade the Step to the latest available version</li>
<li>Or select the Step and in the right side's <code>Version</code> section update to the new version manually.</li>
</ol>
<p>In the dropdown you can set a Step to <strong>always latest</strong>. In this case we'll always update it without further notice.</p>
<p><em>Your settings / provided input values for the Step will be kept for the new version.</em></p>
<p><img src="/img/getting-started/update-steps.png" alt="Update steps in Workflow Editor"></p>
<h2>Remove a step</h2>
<p>Select the step on the left side and click on the <strong>trash can</strong> on the right side or delete it at the bottom of the step.</p>
<h2>Add a new step</h2>
<p>If you want to <strong>add a new Step</strong> to the Workflow,
just click the <code>+</code> between the Steps you want the new one to be.</p>
<p><img src="/img/getting-started/add-your-first-step.png" alt="Add step button in Workflow Editor"></p>
<p>This will show you a list of available Steps in our <strong>Step Library</strong>.
You can search and filter these steps if you want to, or just browse through the collection.
Clicking the Step will add it to your Workflow and then all you have to do is fill in its required inputs
(on the right side you'll see which inputs are required - marked with an orange border).</p>
<p>You can also clone a Step by clicking the <strong>Clone icon</strong> on the right side and then you can <strong>Drag and Drop</strong> it to its place.</p>
<h2>Create a new Workflow</h2>
<p>To create a new Workflow just click on the <code>+</code> sign <strong>at the top, where your workflows are listed.</strong></p>
<p>!!! note &quot;You can create as many workflows for an app as you like.&quot;
Using multiple workflows can be beneficial in case you want to do different
things based on which <em>branch</em> you push new code.
To see how you can control what event should <em>trigger</em>
which <em>workflow</em>, see: <a href="/webhooks/trigger-map/">Control what to build when, with the Trigger Map</a></p>
<p>New workflows are created as a copy of the active workflow when you click the <code>+</code> button.</p>
<p><strong>You can delete the current active workflow</strong> with the orange <code>Delete</code> button
at the top right corner of the workflow area.</p>
<h2>Step inputs</h2>
<h3>Inserting Environment Variables into Step inputs</h3>
<p>Click into any input field of a Step and a green <code>Insert Variable</code> button will appear.
Click this button and you'll get a full list of available Environment Variables.
You can search this list, and when you find the one you're looking for just click it,
and it'll be inserted into the input field for you.</p>
<h3>Environment Variable replace mode</h3>
<p>Under every Step input field you can see one of these two indicators:</p>
<ul>
<li><code>Environment Variables will be replaced in input</code></li>
<li>or <code>Environment Variables won't be replaced in input</code></li>
</ul>
<p>It's the status of the <code>is_expand</code> option of the input.
<em>You can change this only in YAML mode (<code>bitrise.yml</code> tab of the editor).</em></p>
<p>What does this option do?</p>
<ul>
<li>If <strong>enabled</strong> it'll replace Environment Variables (e.g. <code>$HOME</code> or <code>${HOME}</code>)
inside the input text with the Environment Variable's value <strong>before</strong> it would be passed to the Step.</li>
<li>If <strong>disabled</strong> it won't replace anything in the input text, the whole text will be passed to the Step &quot;as-it-is&quot;.</li>
</ul>
<p><strong>What does this mean?</strong> For example, if you have <code>$HOME</code> in the input text
and you enable this option, it'll replace every occurrence of <code>$HOME</code> in that input
with the value of the <code>HOME</code> environment variable
(in this case, the home folder's path, e.g. <code>/Users/[user]</code> or <code>/home/[user]</code>).
If it's disabled then it won't be replaced,
the value you specify for the input will be passed as text (<code>$HOME</code>),
and <em>the Step itself might or might not expand</em> the value.</p>
<p><strong>Usually you should leave this option on the default value, the one defined by the Step for the input</strong>.</p>
<p>In general you should <em>not</em> change this option, but if you have to,
you can do that in YML mode, by adding <code>is_expand: true</code> or <code>is_expand: false</code> to the input's <code>opts</code> list. Example:</p>
<pre><code>- some_input: My Value
  opts:
    is_expand: false
</code></pre>
<h4>A practical example / guideline</h4>
<p>As a general guideline, this option should almost always be <strong>enabled</strong>,
unless you have a specific reason to disable it.</p>
<p><strong>What can be a reason to disable it?</strong> There's pretty much only a single reason:
if your input includes the <code>$</code> character (in a password for example),
and you want to keep the <code>$</code> character in the input, instead of
replacing it with an environment variable.</p>
<p>If you have this expand option enabled and you have a password like <code>pas$word</code>
it'll most likely result in <code>pas</code> after the value expansion,
because there's no <code>$word</code> environment variable available (unless you defined it somewhere).
There might be other cases when you explicitly want to include the <code>$</code> character in the input,
in these cases you should disable the expand option.</p>
<p><em><strong>Note</strong>: if you want to reference another environment variable,
even if that one's value includes the <code>$</code> character, you have to <strong>enable</strong> this option,
or else your reference won't work.
<strong>In a case like this you should disable this option where you specify the value</strong> with <code>$</code> in it,
and enable the option everywhere else, where you reference that environment variable.</em></p>
