<p>If you want to do manual SSH key configuration on <a href="https://www.bitrise.io">bitrise.io</a>
you can generate an appropriate SSH keypair with a simple Command Line / Terminal command:</p>
<pre><code>ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh
</code></pre>
<p>This will generate two files in the current directory (the directory where
you run the command):</p>
<ul>
<li><code>bitrise-ssh</code> (private key)</li>
<li><code>bitrise-ssh.pub</code> (public key)</li>
</ul>
<p>You should copy paste the <strong>public key</strong> to your Git hosting service (GitHub, Bitbucket, etc.),
and when you register your app on <a href="https://www.bitrise.io">bitrise.io</a>
you'll have to provide the <strong>private key</strong>.</p>
