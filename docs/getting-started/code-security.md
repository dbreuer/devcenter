<p>To guarantee the security of your builds we use <a href="/infrastructure/virtual-machines">virtual machines</a> for builds.
Every build runs in its own, clean virtual machine and we discard the whole virtual machine after the build finishes,
erasing every file your build uses and every change you make during your build.</p>
<p><em>This is also true for the Linux/Android stacks, which use Docker containers to run the build.
The build itself still gets a full virtual machine where no other Docker container is started,
only the one used as the environment of the build. In short we only use Docker containers
to manage the environment, not for build environment isolation - that's ensured by using
full virtual machines for every build.</em></p>
<p>This way your builds are always protected from changes made by others and from your previous builds,
no one else can access your code and you can use a stable environment to define your build workflow. Every build is completed in an isolated environment, unrelated to any previous or parallelly running builds.</p>
<h2>Source code</h2>
<p>We don't store your source code. The source code is only accessed on the build machines (virtual machines)
the way you define it in your Bitrise Configuration (workflow). If you don't have a Git Clone step in your configuration,
then the source code won't be touched at all. At the end of the build the whole Virtual Machine is destroyed.</p>
<h2>Code signing and other files</h2>
<p>The files you upload in the Workflow Editor (<strong>Code Signing &amp; Files</strong> section of the editor)
are stored on <code>Amazon S3</code> in a way that it's only accessible for the web servers.</p>
<p>The required credentials are not stored in any database, it is only available in the web servers' environment.
Build servers can't access the files directly either.
When a build starts the web server generates a read-only,
time limited access URL for these files, using <a href="https://docs.aws.amazon.com/aws-sdk-php/v3/guide/service/s3-presigned-url.html">Amazon S3 presigned URLs</a>.</p>
<h2>Passwords</h2>
<p>Passwords are stored in a hashed, encrypted form.
We are encrypting the passwords with <a href="https://en.wikipedia.org/wiki/Bcrypt">bcrypt algorithm</a>, using multiple stretches.</p>
