<h2>The Problem</h2>
<p>A common issue is that you have a project, that has one or more submodules
or other private repository dependencies.</p>
<p>This means that you have to grant access to all repositories in order to make
the build successful.</p>
<p>If your git hosting service supports it, the best, most secure way is to
register <strong>the same SSH key</strong> for every repository you have to access during the build,
as &quot;Deployment keys&quot;. Due to technical reasons (true for most git hosting services),
you should not use multiple SSH keys, instead use the same SSH key for every repository!</p>
<p><strong>If your git hosting service does not support the use of a single SSH key
for multiple repositories</strong> (for example GitHub does not support this!),
you'll have to register the SSH key for a user account.</p>
<p>In this case (e.g. GitHub), there is an easy workaround for the issue.
Simply by adding a &quot;bot&quot; / &quot;machine&quot; user with the SSH key to the repositories
you can solve the problem. <strong>Add the SSH key you would like to use to the user and add the user to the projects</strong>.
You don't have to add the &quot;bot&quot; user with read and write permission,
it is enough to assign read permissions.
After that you can use the SSH key to clone to the repository or any submodule.
It's that simple.</p>
<p><em>On GitHub this is the recommended way to solve this problem,
they refer to these kind of users as &quot;machine&quot;
users - reference:
<a href="https://developer.github.com/guides/managing-deploy-keys/#machine-users">https://developer.github.com/guides/managing-deploy-keys/#machine-users</a>.</em></p>
<p>Of course it's not required to use a special &quot;bot&quot; / &quot;machine&quot; user, you can add the
SSH key to your own account on the git hosting service, but the best practice is
to use a machine user for this use case, and grant read only access for this
machine user, for those repositories you want to access during the build.</p>
<p><em>On GitLab and Bitbucket it's possible to register a single SSH key
as Deploy key to multiple repositories, without the need to create a &quot;bot&quot; / &quot;machine&quot; user.</em></p>
<p>!!! note &quot;Use SSH URLs everywhere&quot;
Most services support SSH key based authentication <strong>only</strong> for SSH URLs
(ex: <code>git@github.com:bitrise-io/bitrise.git</code>), and <strong>not</strong> for HTTPS URLs
(ex: <code>https://github.com/bitrise-io/bitrise.git</code>)!
This means, that <strong>every private repository you want to use have to be addressed with the SSH url</strong>.
If you have direct private git repo references in your <code>Podfile</code> you'll have to
use the SSH url there as well! Same applies for submodules and every other private
git repository url you want to use with the SSH key you register on <a href="https://www.bitrise.io/">Bitrise.io</a>!</p>
<h2>How to do this when you add a new app</h2>
<p>There are three options to grant <a href="https://www.bitrise.io">Bitrise</a> access to your repository:</p>
<ul>
<li><em>Auto-add SSH keypair</em>: <strong>Don't use this option if you use submodules.</strong>
This option will add the SSH key only to the main repository, the one you selected
in the first section of the Add New App page.</li>
<li><em>Generate SSH keypair</em>: will generate a key for you on the <a href="https://www.bitrise.io">Bitrise</a> website
and you will have to copy it manually to the given user.
<strong>This is the recommended option if you want to use submodules / have to access multiple repositories during your build.</strong></li>
<li><em>Use your own SSH keypair</em>: can be used if you also have the private key of the given user.
You just have to paste the private key and <a href="https://www.bitrise.io">Bitrise</a> will be able to access the repositories.
If you'd want to go with this option, it's important that <strong>the SSH key have to be an RSA key, without a passphrase!</strong>
You can find an example of how you can generate a key like that <a href="/faq/how-to-generate-ssh-keypair/">here</a>.</li>
</ul>
<h2>When you already registered your App on Bitrise.io</h2>
<p>When you've already registered an App, the steps to handle the SSH keys are the same
as when adding a new app, the only difference is
that you'll have to do it on the app's <code>Settings</code> tab.</p>
<p>You can find the public SSH key of the app in the <code>Settings</code> of the given
app on <a href="https://www.bitrise.io">Bitrise</a>. Simply scroll down to the &quot;SSH settings&quot; section
and click &quot;Show SSH Public Key&quot;.</p>
<p>Copy the key to the given user and you are ready to build!
Or you can also update the given app's SSH key by clicking the &quot;Change SSH Keypair&quot; button
and choosing one of the three options, just like on the &quot;Add new App&quot; page.</p>
<h2>Service specific notes / guides</h2>
<h3>Github</h3>
<p><em>Don't add the key to the repository as a Deploy Key!</em>
Add it to a GiHub User's account instead, who has access to the repositories.
The recommended way is to use a <a href="https://developer.github.com/guides/managing-deploy-keys/#machine-users">&quot;machine&quot; user</a>,
but of course you're free to add it to any user account which has
at least read only access to all of the repositories used during the build.</p>
