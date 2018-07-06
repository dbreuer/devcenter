<p>To be able to run your Linux stack builds locally you'll need <a href="https://www.docker.com/">docker</a>.</p>
<p>For Linux just follow the <a href="https://docs.docker.com/engine/installation/linux/">official install instructions</a>.</p>
<p>For Mac you can use <a href="https://www.docker.com/products/docker#/mac">Docker for Mac</a>,
which is probably the easiest way to get started.</p>
<p>For this example we'll use <a href="https://github.com/bitrise-samples/sample-apps-android-sdk22">this Bitrise Android sample project</a>.</p>
<p>!!! warning &quot;Large images ahead&quot;
The official Bitrise Docker images are quite large, due to the fact that it includes
a wide variety of preinstalled tools. You'll need at <strong>least</strong> 20-25 GB free disk space!</p>
<p>If you're not familiar with the <a href="https://www.bitrise.io/cli">Bitrise CLI</a>
you should try that first. You don't have to master the CLI,
if you know what <code>bitrise run WORKFLOW</code> does, that should be enough for this tutorial.</p>
<h2>TL;DR;</h2>
<p>If you're familiar with <code>docker</code> and the <code>bitrise</code> CLI:</p>
<ol>
<li>Install <a href="https://www.docker.com/">docker</a></li>
<li>Make sure you have your <code>bitrise.yml</code> in your repository (you don't have to commit it, but the file have to exist in your repository's root directory)</li>
<li><code>cd</code> into your repository's directory on your Mac/Linux
<ul>
<li><em>If you try to reproduce an issue, you should <code>git clone</code> your repository into a <strong>new directory</strong>,
so that the directory will only contain the files which are committed into the repository!</em></li>
</ul>
</li>
<li><code>docker pull bitriseio/docker-android:latest</code></li>
<li><code>docker run --privileged --env CI=false --volume &quot;$(pwd):/bitrise/src&quot; --volume &quot;/var/run/docker.sock:/var/run/docker.sock&quot; --rm bitriseio/docker-android:latest bitrise run WORKFLOW</code>
<ul>
<li>Note: if you want to just jump into the container and experiment inside, you can replace <code>--rm bitriseio/docker-android:latest bitrise run WORKFLOW</code> with <code>-it bitriseio/docker-android:latest bash</code> to start an interactive bash shell inside the container. E.g.: <code>docker run --privileged --env CI=false --volume &quot;$(pwd):/bitrise/src&quot; --volume &quot;/var/run/docker.sock:/var/run/docker.sock&quot; -it bitriseio/docker-android:latest bash</code>.</li>
</ul>
</li>
</ol>
<p><em>Keep reading if you want to read more details and notes about the process and commands!</em></p>
<h2>Getting started</h2>
<p>Open your Terminal / Command Line, and download the docker image you want to use.
In general, if your project is an Android project but you don't use the Android NDK,
to preserve precious disk space you should use the
<a href="https://hub.docker.com/r/bitriseio/docker-android/">bitriseio/docker-android</a> docker image.
You can find other official Bitrise docker images <a href="https://hub.docker.com/u/bitriseio/">on our Docker Hub page</a>.
For this example we'll use the <code>bitriseio/docker-android</code> one.</p>
<p>Downloading docker images from the <a href="https://hub.docker.com">Docker Hub</a> is quite easy:</p>
<pre><code>docker pull bitriseio/docker-android:latest
</code></pre>
<p>Be prepared, this can take quite a bit of time, as this image is over 10 GB.
<em>If the download would fail or hang, you can restart it any time by running
the same command again.</em></p>
<p>Once the download succeeds you have everything prepared to run your build
in Docker! The last thing you have to do is to download your Bitrise build
configuration (<code>bitrise.yml</code>).</p>
<p>!!! note &quot;<code>bitrise.yml</code>&quot;
You can download your project's <code>bitrise.yml</code> from the <strong>Workflow Editor</strong>
on <a href="https://www.bitrise.io">bitrise.io</a>, under the <code>bitrise.yml</code> section.</p>
<p>In your Terminal / Command Line go to (<code>cd</code>) the root directory
of <em>your repository</em>, and make sure your <code>bitrise.yml</code> is at this location.</p>
<p><strong>If you try to reproduce an issue, you should <code>git clone</code> your repository into a new directory,
so that the directory will only contain the files which are committed into the repository!</strong>
It's a frequent reproducibility issue that you try to run the commands in your
normal working directory, where you most likely have files which are not
committed into your repository, e.g. files which are in <code>.gitignore</code>.</p>
<h2>Run your builds</h2>
<p>The only thing left to do is to actually run a build:</p>
<pre><code>docker run --privileged --env CI=false --volume &quot;$(pwd):/bitrise/src&quot; --volume &quot;/var/run/docker.sock:/var/run/docker.sock&quot; --rm bitriseio/docker-android:latest bitrise run WORKFLOW
</code></pre>
<p>!!! note
If you want to just jump into the container and experiment inside, you can replace <code>--rm bitriseio/docker-android:latest bitrise run WORKFLOW</code> with <code>-it bitriseio/docker-android:latest bash</code> to start an interactive bash shell inside the container.
E.g.: <code>docker run --privileged --env CI=false --volume &quot;$(pwd):/bitrise/src&quot; --volume &quot;/var/run/docker.sock:/var/run/docker.sock&quot; -it bitriseio/docker-android:latest bash</code>.
After this, if you want to, you can run <code>bitrise run WORKFLOW</code>, which will run the workflow inside the container.
To exit from the container just run <code>exist</code>.</p>
<p><em>Don't forget to replace <code>WORKFLOW</code> with the actual ID of your workflow in your <code>bitrise.yml</code>,
with something like <code>primary</code>!</em></p>
<p>This command will share the current directory (the directory of your repository)
as a shared volume with the docker container, and will make it available <strong>inside</strong> the
container at the path <code>/bitrise/src</code>.</p>
<p>The <code>--env CI=false</code> flag sets the environment variable <code>CI</code> to <code>false</code> - this will
make Bitrise CLI to skip certain steps which only make sense to run in a Continuous Integration
environment. An example is the <code>Git Clone</code> step - you already have your code, so there's
no need to git clone it again inside the docker container (that's why we
shared the code directory as a <code>--volume</code>).</p>
<p>The <code>--rm</code> flag tells docker to discard the container after the <code>docker run</code>
command finishes. This means that if you run the command again, the only thing which will
persist between the <code>docker run ..</code> commands are the files stored at the shared <code>--volume</code>
(in your repository's directory). Every other file which is generated into a temp
or any other location will be discarded / won't be kept. If you want to
debug the container after a failed build feel free to remove the <code>--rm</code> flag,
and check out a Docker tutorial about how you can connect to an existing
docker container - <em>Note: simply running the command again <strong>will not</strong> use the same container,
but <strong>will create a new one</strong></em>!</p>
<p>The <code>--privileged</code> flag allows access control of the host (!) from the docker container,
so you should never use this flag unless you trust the docker image you will use!
This flag is required for allowing VPNs to work (to change network configs
of the host) for example.</p>
<p>The <code>--volume &quot;/var/run/docker.sock:/var/run/docker.sock&quot;</code> flag exposes the
docker socket from the host for the container - this is required
if you want to run other docker containers from whithin the container,
or if you want to run any <code>docker</code> command during your build / inside the container.</p>
