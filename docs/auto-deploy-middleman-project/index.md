<p>This tutorial helps you create a basic static website project (e.g. a Blog) with <a href="https://middlemanapp.com/">Middleman</a>,
connect and deploy it with Bitrise.</p>
<h2>1. Create and clone a repository on Github</h2>
<p>To create a new repository on Github, <a href="https://github.com/repositories/new">click here</a>.
You need to sign in with your Github account, or sign up if you don't have one yet.
Once you created your repository, clone it.</p>
<h2>2. Install Middleman</h2>
<p>Middleman is distributed using the RubyGems package manager.
This means you will need both the Ruby language runtime installed and RubyGems to begin using Middleman.</p>
<p>MacOS comes prepackaged with Ruby, however, some of the Middleman's dependencies need to be compiled
during installation and on macOS that requires Xcode.
Xcode can be installed via the <a href="http://itunes.apple.com/us/app/xcode/id497799835?ls=1&amp;mt=12">Mac App Store</a>.
Alternately you can just install the Xcode Command Line Tools, that should be enough
if you don't want to install the full Xcode.app.</p>
<p>Once you have Ruby and Xcode (Command Line Tools), execute the following from the command line:</p>
<pre><code>gem install middleman
</code></pre>
<p>This will install Middleman, its dependencies and the command-line tools for using Middleman.</p>
<h2>3. Create a Middleman project</h2>
<p>To create a Middleman project, navigate to the root folder of your repository and execute the following from the command line:</p>
<pre><code>middleman init my_new_project
</code></pre>
<p>Once the setup is finished, commit and push your changes.</p>
<h2>4. Connect your repository with Bitrise</h2>
<p>To connect your repository with Bitrise, visit the <a href="https://www.bitrise.io/">Bitrise</a> site.
You need to sign in with your Bitrise account, or sign up if you don't have one yet.
Once you're signed in, select <a href="https://www.bitrise.io/apps/add">Add new App</a> in the top dropdown menu.</p>
<p>In the first step, you need to select the provider, where you store your code, in this case, GitHub.</p>
<p>In the second step, you will see a list of all your repositories on GitHub. Select the one you just created.</p>
<p>In the third step, you will get an alert, since the repository you are connecting is not an Xcode project.
Select &quot;Configure Manually&quot;, then enter the branch name &quot;master&quot;.</p>
<h2>5. Prepare your Workflow</h2>
<p>Once you created your project, select it in the <a href="https://www.bitrise.io/dashboard">Dashboard</a>
and select the <code>Workflow</code> tab from the top menu.
We are going to add a bash script that will be executed on each build.
First, delete all the automatically created steps (if any).
Next, we need to add new steps.
You can add new steps by clicking on the <code>+</code> sign button between steps / in the step list and selecting the step
from the step list popup. Add the following steps to your Workflow, in this order:</p>
<ol>
<li><code>Activate SSH key</code> - unless you used the public, non SSH URL of the repository during the Add New App process</li>
<li><code>Git Clone Repository</code></li>
<li><code>Script</code></li>
</ol>
<p>Select the <code>Script</code> step and add the following lines:</p>
<pre><code>#!/bin/bash
set -ex
bundle install
bundle exec middleman build --verbose
</code></pre>
<p>The above code installs the dependencies specified in your <code>Gemfile</code>, and runs a Middleman build on the virtual machine.</p>
<h2>6. Deploy to Amazon S3: Add an Amazon S3 bucket sync to your Workflow steps</h2>
<p>Now we are going to add and customize an Amazon S3 bucket sync to the Workflow steps.
Click on the <em>Add new Step</em> button and select <code>Amazon S3 bucket sync</code> from the step list.</p>
<p>Select the step to customize it.</p>
<ul>
<li>Enter your AWS access key</li>
<li>Your AWS secret key</li>
<li>And enter a name for your S3 bucket.</li>
<li>For your local path, enter the following: <code>$BITRISE_SOURCE_DIR/build/</code></li>
</ul>
<p>This will select the <em>contents</em> of the build folder in the project source path on the virtual machine.
It will be uploaded on every build.</p>
<p>For access control, enter <code>public-read</code> or <code>private</code>, as advised.</p>
<p>!!! note &quot;Alternative deploy destinations&quot;
You can of course use <code>Heroku</code>, GitHub pages or any other service
as your deployment target.
You can find a more complex setup, deploying to <code>Heroku</code>,
<a href="http://blog.bitrise.io/2016/04/29/hooking-up-a-middleman-project-to-deploy-a-static-site-to-heroku-with-bitrise.html">on our Blog</a></p>
<h2>7. Run build manually</h2>
<p>Once the configuration of your Workflow is complete,
you can run a build manually by clicking on the <code>Start/Schedule a build</code> button on the app's page (where you see the
<code>Builds</code>, <code>Workflow</code>, <code>Team</code>, ... tabs).</p>
<h2>8. Run builds automatically</h2>
<p>If you chose GitHub when adding your repository, each code change (commit) on GitHub will automatically trigger a Bitrise build.
Otherwise you can find more information about how you can setup a Webhook, to trigger builds
automatically for code push, pull request and tags <a href="/webhooks/">here</a>.</p>
