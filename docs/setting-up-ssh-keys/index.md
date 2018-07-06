<p>SSH keys serve the role of secure transfer between services. In the case of Bitrise, it will ask for your permission to be authorized at your git source provider, e.g. GitHub. Read more about how to <a href="/adding-a-new-app/connecting-a-repository">authorize Bitrise</a>.</p>
<p>The reason behind the need for being authorized, is that Bitrise has to have a working SSH connection to your repository to be able to clone it. There are several ways to make it work. Automatically, by adding it manually, or by using your own key.</p>
<p>!!! warning &quot;Use SSH URLs everywhere&quot;
Most services support SSH key based authentication <strong>only</strong> for SSH URLs (ex: <code>git@github.com:bitrise-io/bitrise.git</code>), and <strong>not</strong> for HTTPS URLs (ex: <code>https://github.com/bitrise-io/bitrise.git</code>)! This means, that <strong>every private repository you want to use have to be addressed with the SSH URL</strong>. If you have direct private git repo references in your <code>Podfile</code> you'll have to use the SSH URL there as well! Same applies for <code>submodules</code> and every other private git repository URL you want to use with the SSH key you register on <a href="https://www.bitrise.io/">Bitrise.io</a>!</p>
<h2>Automatic setup</h2>
<p>In case of <code>GitHub</code> and <code>Bitbucket</code> repository setups, Bitrise will generate a public and private SSH key pair and ask whether you like the idea of adding that into your repository automatically as deploy key, or you'd like to add it by hand.</p>
<p><img src="/img/adding-a-new-app/bitrise_auto_add_ssh_key.png" alt="Screenshot"></p>
<p>As the description tells, you are able to auto-add the key to the repository if you have admin rights for it. In any other case, you are able to copy the public key from here and add it to your repository at your provider.</p>
<p>The auto-add option will add the generated key as a read-only <a href="https://developer.github.com/guides/managing-deploy-keys/#deploy-keys">deploy key</a> to your repository, it's the best for your security.</p>
<h2>Manual setup</h2>
<p>If you have private dependencies, you have to add the generated SSH key manually to your profile at your provider instead. That's because deploy keys are only valid for only one repository.</p>
<p>!!! note &quot;A bot user&quot;
There's an easy way to work around modifying your own profile by adding a &quot;bot&quot; user with the SSH key to the repositories. <strong>Add the SSH key you would like to use to the user and add the user to the projects</strong>. You don't have to add the &quot;bot&quot; user with read and write permission, it is enough to assign read permissions. After that you can use the SSH key to clone to the repository or any submodule. It’s that simple.</p>
<p>!!! warning
<strong>Do not</strong> add the key to the repository Deploy Keys. Add it to the user's account who has access to the repositories.</p>
<h3>GitHub</h3>
<p><img src="/img/adding-a-new-app/ssh-github.png" alt="Screenshot"></p>
<h3>Bitbucket</h3>
<p><img src="/img/adding-a-new-app/ssh-bitbucket.png" alt="Screenshot"></p>
<h3>GitLab</h3>
<p><img src="/img/adding-a-new-app/ssh-gitlab.png" alt="Screenshot"></p>
<h3>Use your own key</h3>
<p>This option can be used if you also have the private key of the given user. You just have to paste the private key and <a href="https://www.bitrise.io">Bitrise</a> will be able to access the repositories.</p>
