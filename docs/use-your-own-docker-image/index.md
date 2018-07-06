<p>!!! note &quot;Have a question or suggestion? Join the discussion!&quot;
You can find this guide's discussion topic at:
<a href="http://discuss.bitrise.io/t/how-to-use-your-own-docker-image-for-your-builds/69">discuss.bitrise.io/t/69</a></p>
<p>There are two ways to use <code>docker</code> on <a href="https://www.bitrise.io">bitrise.io</a>:</p>
<ol>
<li>Run <code>docker</code> commands yourself, e.g. with a <code>Script</code> step</li>
<li>Use a Linux/Android stack and set the environment docker image for the app (<code>Settings</code> tab)</li>
</ol>
<p><strong>The first option is strongly preferred, you should not change the base environment docker image (on the <code>Settings</code> tab on bitrise.io)
unless you really have to!</strong> Running the <code>docker</code> commands yourself during the build is way more flexible,
and provides an overall better control.</p>
<h2>Run docker commands during the build</h2>
<p><strong>This is the preferred way of using docker</strong>, both locally and on <a href="https://www.bitrise.io">bitrise.io</a>.</p>
<p>All you have to do is:</p>
<ol>
<li>Add a <code>Script</code> step to your workflow</li>
<li>And in the <code>Script</code> step run the <code>docker</code> (or <code>docker-compose</code>, etc.) command you want to</li>
<li>Additionally, if you want to run the build on <a href="https://www.bitrise.io">bitrise.io</a>, make sure that you select
a Linux/Android stack for the app; those stacks have <code>docker</code> preinstalled and ready to use our of the box.</li>
</ol>
<p><em>You can find a sample repository on GitHub,
which is configure to run on your Mac/Linux using the <a href="https://www.bitrise.io/cli">Bitrise CLI</a>:
<a href="https://github.com/bitrise-samples/minimal-docker">https://github.com/bitrise-samples/minimal-docker</a></em></p>
<h3>Running docker hello-world</h3>
<p>Following the official &quot;getting started&quot; guide for example, to run the &quot;hello world&quot; docker image
your bitrise build configuration yml can be as simple as:</p>
<pre><code>---
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- push_branch: &quot;*&quot;
  workflow: primary
- pull_request_source_branch: &quot;*&quot;
  workflow: primary
workflows:
  primary:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv &quot;SSH_RSA_PRIVATE_KEY&quot; | ne &quot;&quot;}}'
    - git-clone@3.4.1: {}
    - script@1.1.3:
        title: docker run hello-world
        inputs:
        - content: |-
            #!/bin/bash
            # fail if any commands fails
            set -e
            # debug log
            set -x

            docker run hello-world
</code></pre>
<h3>Build and run a Dockerfile</h3>
<p>A bit more complex example, using your own <code>Dockerfile</code> in your repository to define the docker environment:</p>
<pre><code>---
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- push_branch: &quot;*&quot;
  workflow: primary
- pull_request_source_branch: &quot;*&quot;
  workflow: primary
workflows:
  primary:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv &quot;SSH_RSA_PRIVATE_KEY&quot; | ne &quot;&quot;}}'
    - git-clone@3.4.1: {}
    - script@1.1.3:
        title: docker run
        inputs:
        - content: |-
            #!/bin/bash
            # fail if any commands fails
            set -e
            # debug log
            set -x

            docker build -t bitrise-minimal-sample .
            docker run --rm bitrise-minimal-sample
</code></pre>
<p>This workflow will:</p>
<ol>
<li>Git Clone your repository</li>
<li>And then run <code>docker build -t bitrise-minimal-sample .</code> and <code>docker run --rm bitrise-minimal-sample</code> in the repository's root.</li>
</ol>
<p>If you have a <code>Dockerfile</code> like this in the root of the repository:</p>
<pre><code>FROM alpine:3.3

CMD cat /etc/alpine-release
</code></pre>
<p>The output will be something like:</p>
<pre><code>+------------------------------------------------------------------------------+
| (2) docker run hello-world                                                   |
+------------------------------------------------------------------------------+
| id: script                                                                   |
| version: 1.1.3                                                               |
| collection: https://github.com/bitrise-io/bitrise-steplib.git                |
| toolkit: bash                                                                |
| time: 2016-11-21T14:28:23Z                                                   |
+------------------------------------------------------------------------------+
|                                                                              |
+ docker build -t bitrise-minimal-sample .
Sending build context to Docker daemon 69.12 kB

Step 1 : FROM alpine:3.3
3.3: Pulling from library/alpine
985c5f84712b: Pulling fs layer
985c5f84712b: Verifying Checksum
985c5f84712b: Download complete
985c5f84712b: Pull complete
Digest: sha256:ec40755933414575748cecf929f1f2012cace2d2e0f8147e77e652d600ff17d7
Status: Downloaded newer image for alpine:3.3
 ---&gt; 6c2aa2137d97
Step 2 : CMD cat /etc/alpine-release
 ---&gt; Running in 507cfb961cc7
 ---&gt; 02a0da3ac697
Removing intermediate container 507cfb961cc7
Successfully built 02a0da3ac697
+ docker run --rm bitrise-minimal-sample
3.3.3
|                                                                              |
+---+---------------------------------------------------------------+----------+
| ✓ | docker run hello-world                                        | 4.24 sec |
+---+---------------------------------------------------------------+----------+
</code></pre>
<p><em>You can find a sample repository on GitHub,
which is configure to run on your Mac/Linux using the <a href="https://www.bitrise.io/cli">Bitrise CLI</a>:
<a href="https://github.com/bitrise-samples/minimal-docker">https://github.com/bitrise-samples/minimal-docker</a></em></p>
<h3>Using docker-compose</h3>
<p>The previous example could be even shorter using <a href="https://docs.docker.com/compose/">docker-compose</a>.</p>
<p>For example, if you have a <code>docker-compose.yml</code> like this in your repository root (where the <code>Dockerfile</code> is):</p>
<pre><code>version: '2'
services:
  sample-app:
    build: .
</code></pre>
<p>You can replace the</p>
<pre><code>docker build -t bitrise-minimal-sample .
docker run --rm bitrise-minimal-sample
</code></pre>
<p>lines with a single <code>docker-compose</code> call:</p>
<pre><code>docker-compose run --rm sample-app
</code></pre>
<p>Docker compose will build and run the image automatically, you don't have to specify a <code>-t</code> tag - the <code>services</code>
name will be used by <code>docker-compose</code> to tag the image automatically.</p>
<p><em>You can find a sample repository on GitHub,
which is configure to run on your Mac/Linux using the <a href="https://www.bitrise.io/cli">Bitrise CLI</a>:
<a href="https://github.com/bitrise-samples/minimal-docker">https://github.com/bitrise-samples/minimal-docker</a></em></p>
<h2>Using bitrise.io custom docker image option</h2>
<blockquote>
<p>Use a Linux/Android stack and set the environment docker image for the app (<code>Settings</code> tab)</p>
</blockquote>
<p>!!! warning &quot;Custom Android docker image&quot;
Creating and maintaining your own Android Docker image can be quite time consuming!
<strong>If what you need is just to install a couple of additional tools, you should do that with e.g. a Script step instead!</strong>
For more information see the <a href="/tips-and-tricks/install-additional-tools/">Install Any Additional Tool</a> guide.
<em>You should only use your own Android docker image if you really have to!</em></p>
<p>If you want to run your build in a custom docker environment,
<strong>you should base your own docker image on one of our base Docker images</strong>, as those have every base tool pre-installed,
the standard bitrise directories created, the Environments (like <code>$BITRISE_DEPLOY_DIR</code>) set,
and are pre-cached on the build virtual machines.
<strong>If you decide to create your own Docker image please read this guide, from start to finish!</strong></p>
<p><strong>Feel free to send Pull Request for our images if you think we missed something, which would be useful for everyone who uses our images!</strong></p>
<p>The bare-minimum base image can be found at:</p>
<ul>
<li>Docker Hub: <a href="https://hub.docker.com/r/bitriseio/docker-bitrise-base/">https://hub.docker.com/r/bitriseio/docker-bitrise-base/</a></li>
<li>GitHub: <a href="https://github.com/bitrise-docker/bitrise-base">https://github.com/bitrise-docker/bitrise-base</a></li>
</ul>
<p>Android base image, built on the bare-minimum base image, adding Android specific tools and Envs:</p>
<ul>
<li>Docker Hub: <a href="https://hub.docker.com/r/bitriseio/docker-android/">https://hub.docker.com/r/bitriseio/docker-android/</a></li>
<li>GitHub: <a href="https://github.com/bitrise-docker/android">https://github.com/bitrise-docker/android</a></li>
</ul>
<p>Android NDK image, built on the Android base image, adding a pre-installed Android NDK and Envs:</p>
<ul>
<li>Docker Hub: <a href="https://hub.docker.com/r/bitriseio/android-ndk/">https://hub.docker.com/r/bitriseio/android-ndk/</a></li>
<li>GitHub: <a href="https://github.com/bitrise-docker/android-ndk">https://github.com/bitrise-docker/android-ndk</a></li>
</ul>
<p>As you can see, if you want to base your own image on one of our available images you can do that by specifying
it at the very top of your <code>Dockerfile</code> with a <code>FROM bitriseio/IMAGE-ID:latest</code>,
for example: <code>FROM bitriseio/docker-bitrise-base:latest</code></p>
<p>!!! warning &quot;Don't use the <code>-alpha</code> images for your builds&quot;
For every docker image we have on Docker Hub we have a <code>-alpha</code> post fixed version too.
the <code>-alpha</code> ones are rebuilt frequently and are <strong>not precached on <a href="https://www.bitrise.io">bitrise.io</a></strong>,
so you should avoid those. The only purpose of the <code>-alpha</code> images is to provide
ready to use test environments for us, before we would publish a non <code>-alpha</code> version.</p>
<p><strong>Important</strong>: you have to use the <strong>Docker Hub ID</strong> of the image you want to use as
the base image (ex: <code>bitriseio/docker-android</code>, <code>bitriseio/android-ndk</code> or <code>bitriseio/docker-bitrise-base</code>).</p>
<p>You can find an example project which extends our Android image by
installing additional SDKs at: <a href="https://github.com/viktorbenei/docker-bitrise-android-ext">https://github.com/viktorbenei/docker-bitrise-android-ext</a></p>
<h3>Create the Docker Image, to be able to use it on bitrise.io</h3>
<p>You can create it any way you want to and push it into any Docker registry.
The only requirement is that it have to be a <strong>public</strong> image, private images are not (yet) supported.</p>
<p>We'll show a quick example with GitHub and Docker Hub, using Docker Hub's
automatic builds (it'll automatically create a new Docker image for you every time you change your Dockerfile on GitHub).</p>
<p>What you need for this guide:</p>
<ul>
<li><a href="https://github.com">GitHub account</a></li>
<li><a href="https://hub.docker.com">Docker Hub account</a></li>
</ul>
<p>First, you have to create a new repository on GitHub, and add at least a <code>Dockerfile</code>, with a <code>FROM bitriseio/IMAGE-ID:latest</code>
statement at the top of the <code>Dockerfile</code>, like the one you can see at:
<a href="https://github.com/viktorbenei/docker-bitrise-android-ext/blob/master/Dockerfile#L1">https://github.com/viktorbenei/docker-bitrise-android-ext/blob/master/Dockerfile#L1</a>
(<em>don't forget to commit &amp; push it!</em>).</p>
<p>!!! note &quot;Which image to use?&quot;
1. If you don't need the Android tools you should base your image on
the <strong>bitrise-base</strong> (<code>bitriseio/docker-bitrise-base</code>) image
and install just the things you need.
1. If you need the Android tools then you should use
the <strong>android</strong> (<code>bitriseio/docker-android</code>) image
or the <strong>bitrise-base</strong> (<code>bitriseio/docker-bitrise-base</code>) image.
1. You should only use the <strong>android-ndk</strong> (<code>bitriseio/android-ndk</code>) image
as the base image if you actually need the NDK.</p>
<pre><code>From a performance perspective: you should install the least amount of tools in your image,
as it'll make your image smaller, which means faster download &amp; build start.
</code></pre>
<p>You now have the description of your image. Go to <a href="https://hub.docker.com">Docker Hub</a>, click <code>Create</code> in the top menu and select <code>Create Automated Build</code>.
If you haven't linked your GitHub account to your Docker Hub account you'll have to do it now.
Once the link between GitHub and Docker Hub is established you'll see a list of your GitHub repositories.
Select the repository you just created (the one with the <code>Dockerfile</code> in its root), and follow the guide.</p>
<p>Congratulation! You now have a fully automatic Docker image creation, based on your GitHub repository!
This means that every time you change the repository, commit &amp; push the change Docker Hub will pick up the new <code>Dockerfile</code> and will build a Docker image for you.</p>
<p><strong>One more thing you should do is to Link your image to our base image you use, so that every time our base image is updated your image will update as well.</strong></p>
<p><em>This is especially important if you base your Docker image on one of our Android images.
Those images are quite large, and if we have to do a change in the base Docker image and you don't build a new image,
<strong>your image will require the old base image, which won't be pre-cached</strong> on the build Virtual Machines anymore!
This means that to <code>docker pull</code> your image it won't be enough to download just the diffs anymore,
<strong>the whole image will have to be pulled</strong> which might even result in errors like &quot;no space left on the device&quot; -
to <code>docker pull</code> the base Android image, if no cache is available, it already requires ~10GB disk space, and the Android NDK image is even larger!</em></p>
<p><strong>Link your image to one of ours</strong>: you can do this on DockerHub, on the <code>Build Settings</code> tab,
under the <code>Repository Links</code> section. Just specify the ID of our Docker image (ex: <code>bitriseio/docker-android</code>),
save the link and the next time the specified image is updated your image will be re-built as well (using the <code>Dockerfile</code> in <strong>your</strong> repository).</p>
<h3>Use your own (public) Docker image for your builds</h3>
<p>Once you have your own Docker image and you verified that it can be <code>docker pull</code>-ed,
you can set its ID on the <code>Settings</code> tab of your app on <a href="https://www.bitrise.io">bitrise.io</a>,
in the <code>Stack Selector</code> section.</p>
<p>You just have to copy paste the ID of your image (e.g. <code>bitriseio/docker-bitrise-base</code>)
into the <code>Docker image to use</code> field and click the <code>Save</code> button.
Your next build will use the image you specified.</p>
<p>!!! note &quot;Have a question or suggestion? Join the discussion!&quot;
You can find this guide's discussion topic at:
<a href="http://discuss.bitrise.io/t/how-to-use-your-own-docker-image-for-your-builds/69">discuss.bitrise.io/t/69</a></p>
