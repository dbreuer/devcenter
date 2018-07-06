<p>For this example we'll attach the OS X <code>system.log</code> to the Build as an Artifact,
but this works for any file, even for ones that you generate during the build,
you just have to replace the example path we use (<code>/var/log/system.log</code>) with the path you want to deploy.
You can of course use Environment Variables in the path too, like <code>$HOME/</code>.</p>
<p><em>Deployed Artifacts appear on the Build's page, in the Artifacts &amp; Apps section,
and anyone who has access to the Build page can download it from there.</em></p>
<p>To do this:</p>
<ul>
<li>Add a new <a href="https://github.com/bitrise-io/steps-deploy-to-bitrise-io">Deploy to Bitrise.io</a> step to your workflow, to any point you want to (can be the very last step in the workflow, but of course if you want to deploy a file which is generated during the build you should add the step <strong>after</strong> the file is generated and available).</li>
<li>Change the <code>Deploy directory or file path</code> input of the Step to: <code>/var/log/system.log</code></li>
</ul>
<p>A YAML configuration example of the step &amp; input:</p>
<pre><code>    - deploy-to-bitrise-io:
        inputs:
        - deploy_path: &quot;/var/log/system.log&quot;
</code></pre>
<p>That's all, your next build will attach the OS X system log file
to your build - you'll see it at the top of the Build's page.</p>
<p>!!! note &quot;By default the <strong>Deploy to Bitrise.io</strong> will always run&quot;
By default the <code>Deploy to Bitrise.io</code> will always run,
even if a previous step fails, <strong>so you can deploy failed step/tool logs too.</strong></p>
<h2>Deploy a directory</h2>
<p>The <code>Deploy to Bitrise.io</code> step accepts both file and directory path as its input,
but by default <strong>it does not deploy files recursively</strong>, from sub directories
if you specify a directory as it's <code>deploy_path</code> input.</p>
<p>If you want to do that and deploy the whole directory with every sub directory
and the files in the sub directories, you have to enable the &quot;Compress&quot; option of the step.</p>
<p>In this mode the step will compress (zip) the whole directory, and deploy
the compressed file, instead of deploying files one by one.</p>
<p>An example configuration:</p>
<pre><code>    - deploy-to-bitrise-io:
        inputs:
        - deploy_path: /deploy/this/directory/recursively
        - is_compress: 'true'
</code></pre>
<p><em>Note: as every input's, <code>is_compress</code>'s value have to be a <strong>string</strong>, that's why <code>true</code> is surrounded with quotes.</em></p>
<p>!!! note &quot;Using more than one <code>Deploy to Bitrise.io</code> step&quot;
You can use as many <code>Deploy to Bitrise.io</code> steps as you want to,
even in a single build / workflow.
Alternatively of course you can move all the files you want to deploy
into a single directory, and deploy that directory with the step,
it's up to you to decide which solution works best for you.</p>
