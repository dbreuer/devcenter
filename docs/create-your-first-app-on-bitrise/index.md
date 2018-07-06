<p>We are always refining our UI and UX, to achieve the best and smoothest experience possible,
but at the same time give you enough room for experimentation and customization.</p>
<p>Because of the very reason of us believing that you should be able to do everything you want with Bitrise,
some parts may seem a bit complex at first glance.</p>
<p>This guide will help you get your first app up and running on Bitrise. Let's dive in!</p>
<p>First of all you have to open the <a href="https://www.bitrise.io/apps/add">Add New App page</a>,
either by clicking <code>Add</code> on the <a href="https://www.bitrise.io/dashboard">Dashboard</a>,
or selecting <code>Add new App</code> in the Account drop down menu (top right corner).</p>
<h2>1. Code repository setup</h2>
<p>The first step of adding an app is to specify where its code is stored.</p>
<p>You can either choose any one of <a href="https://github.com/">GitHub.com</a>, <a href="https://bitbucket.org/">Bitbucket.org</a> or <a href="https://gitlab.com/">GitLab.com</a> or add an other location manually.</p>
<h3>GitHub / Bitbucket / GitLab</h3>
<p>Under Connect your repository just choose the git hosting service for the repo you want to add to Bitrise.
(If you haven't connected your GitHub, Bitbucket or GitLab account yet on your profile, click on the green button to do so here.) Now you can see all your repos listed and a Search field in case you have many of them. If you hover on the repository names, you can get a glimpse of their descriptions, too.
Your personal repos are separated from the ones that belong to an organization or other user.</p>
<p>Select the repository from the list to proceed to the next step.</p>
<p>!!! note &quot;Why does Bitrise need write permissions on Github/Bitbucket/GitLab?&quot;
There are two things that Bitrise couldn't do without write permissions:</p>
<pre><code>- Adding an SSH key to the selected repository
- Registering a Webhook for the repository

Please note, that __if you want to avoid giving Bitrise write permissions,
you can select `Other / Manual`__ instead, and do the setup yourself.
</code></pre>
<h3>Other / Manual setup option</h3>
<p>Paste your HTTPS git clone URL where Bitrise can access your code and click on <code>Next</code> to proceed.</p>
<h2>2. Setup repository access</h2>
<p>You need to specify how Bitrise will be able to access the source code. Depending on whether or not you have admin rights to the repo</p>
<h3>Auto-add the SSH key Bitrise generated for you</h3>
<p><em>This option is available for GitHub, Bitbucket and GitLab.com repositories,
if you have your account connected to your Bitrise account.</em></p>
<p>This is the easieast, fastest way. You can just click on <code>Auto add</code>
<strong>if you have admin rights to the repo</strong> you selected.</p>
<h3>Copy the public key Bitrise generated</h3>
<p>If you use other repos for your build, you have to copy the <strong>public key</strong> and <strong>register it as an account SSH key</strong> on your git hosting service (<em>not</em> as a deployment key).
You can also use this option if you don't have admin rights to the repo, or if the repository is not hosted on GitHub, Bitbucket or GitLab.com or if you use submodules and want to use the same SSH key for multiple repositories.
If you use submodules or private Cocoapods,
use this guide: <a href="/faq/adding-projects-with-submodules/">Adding projects with submodules</a></p>
<h3>Use your own keypair</h3>
<p>You can paste your existing SSH <strong>private key</strong> on Add own SSH tab.
<strong>Make sure it is an RSA private key without a passphrase,</strong>
otherwise you won't be able to use it on Bitrise.</p>
<p>You can find a guide <a href="/faq/how-to-generate-ssh-keypair/">here</a> about
how you can generate an SSH key like this.</p>
<p>If you use submodules, private Cocoapods,
or have to access more than one private repository
during the build, you should check this guide: <a href="/faq/adding-projects-with-submodules/">Adding projects with submodules</a></p>
<h2>3. Validation setup</h2>
<p>In this section you have to specify a branch, which will be used in the next step:
your repository will be cloned, the specified branch will be checked out,
and our <a href="https://github.com/bitrise-core/bitrise-init">open source project scanner</a>
will scan through the repository, and will construct base configuration(s)
appropriate for your project.</p>
<p><em>You can choose to configure your project manually.
This is only recommended if you can't use the automatic
project scanner to generate a good base configuration for you.
Choose this option only if you really know what you're doing,
or if you can't use the automatic scanner!</em></p>
<h2>4. Validating repository</h2>
<p>You don't have to do anything in this section: a validation
is started automatically based on the setup you have just finished.
You can check the progress and the logs of the validation while it runs,
and the errors and warnings in case the scanner would generate any.</p>
<h2>5. Project build configuration</h2>
<p>Platform selection: We try to detect on validation whether you added an Android, iOS, or Xamarin project,
or any other project type the <a href="https://github.com/bitrise-core/bitrise-init">scanner</a> supports.
If we succeed, you can either Confirm the settings or Edit them.
If we fail to detect it, you have to select one and configure it manually.</p>
<p>We will also try to detect your build configuration automatically, based on your project settings / project
files in the repository.</p>
<h2>6. Webhook setup</h2>
<p>To have Bitrise <strong>automatically start a build every time you push code into your repository</strong> you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.</p>
<p>If we have permission for adding webhooks automatically to the source code hosting service you use, you can add the webhook in this section with a single click or you can skip this step (unrecommended).</p>
<p>!!! warning &quot;Error: Webhook registration failed&quot;
If you see a message like this, that means that you don't have admin rights to the repo,
so no webhook could be created. Contact the administrator, register the webhook manually (see link to the guide below)
or skip this step if you're OK with starting builds manually (not advised).</p>
<p>You can find the webhook setup guide <a href="/webhooks/">here</a>,
if you'd have to do this manually.</p>
<h2>7. Congratulations, you have set up your first app on Bitrise.io!</h2>
<p>After you are done in the &quot;webhook&quot; section, a build is triggered automatically
for your app, with the base configuration detected and generated by
the &quot;Repository validator / scanner&quot;. At this point you should have
a base working configuration, which you'll be able to improve and change
to fit your project's development process.</p>
