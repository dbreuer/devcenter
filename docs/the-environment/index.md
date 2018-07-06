<h2>Hardware</h2>
<p>We're still experimenting with new VM providers and VM configurations, but in general, what you can expect:</p>
<ul>
<li>at least 7.5GB RAM</li>
<li>at least 2 CPU cores</li>
<li>64 bit CPU</li>
<li>at least 10GB free disk space</li>
</ul>
<h2>Environment</h2>
<p>We use standard <a href="http://www.docker.com">Docker</a> images, published on <a href="https://hub.docker.com">Docker Hub</a>,
and the related <code>Dockerfile</code> (the description file which describes the docker image / environment,
and which is directly used to build the image) can be found on <a href="https://github.com/bitrise-docker">GitHub</a>.</p>
<p>Right now we have three docker images, built on top of each other:</p>
<ol>
<li><strong>Bitrise Base</strong> image ( <a href="https://github.com/bitrise-docker/bitrise-base">GitHub</a> / <a href="https://hub.docker.com/r/bitriseio/docker-bitrise-base/">Docker Hub</a> )
<ul>
<li>includes all the non-Android tools and environment setup</li>
<li>ideal to be used for non-Android projects as a base image, if you want to use it locally too, as this is
the smallest image</li>
<li><code>Ruby</code>, <code>Go</code>, <code>Python</code>, <code>git</code> and the <a href="https://www.bitrise.io/cli">bitrise command line tools</a> are all preinstalled and ready to use.</li>
<li>OS: <code>Ubuntu 16.04</code>, 64 bit</li>
<li>Related <code>Dockerfile</code> where you can see what's preinstalled in this image:
<a href="https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile">https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile</a></li>
</ul>
</li>
<li><strong>Base Android</strong> image (  <a href="https://github.com/bitrise-docker/android">GitHub</a> / <a href="https://hub.docker.com/r/bitriseio/docker-android/">Docker Hub</a> )
<ul>
<li><strong>extends the Bitrise Base image</strong> with Android specific tools and environments.</li>
<li>Multiple Android SDK, Build Tool and system image versions are preinstalled, as well as <code>gradle</code> and <code>maven</code>.</li>
<li>You can use the <code>$ANDROID_HOME</code> environment variable to point to the location of the pre-installed Android SDK</li>
<li>Related <code>Dockerfile</code> where you can see what's preinstalled in this image:
<a href="https://github.com/bitrise-docker/android/blob/master/Dockerfile">https://github.com/bitrise-docker/android/blob/master/Dockerfile</a></li>
</ul>
</li>
<li><strong>Android NDK</strong> image (  <a href="https://github.com/bitrise-docker/android-ndk">GitHub</a> / <a href="https://hub.docker.com/r/bitriseio/android-ndk/">Docker Hub</a> )
<ul>
<li><strong>built on the Base Android image</strong>, extends it with the latest Android NDK.</li>
<li>You can use the <code>$ANDROID_NDK_HOME</code> environment variable to point to the location of the preinstalled Android NDK, and it's also added to <code>$PATH</code></li>
<li>Related <code>Dockerfile</code> where you can see what's preinstalled in this image:
<a href="https://github.com/bitrise-docker/android-ndk/blob/master/Dockerfile">https://github.com/bitrise-docker/android-ndk/blob/master/Dockerfile</a></li>
</ul>
</li>
</ol>
<p><strong>You can find the pre-installed tools &amp; System Report</strong> of this Stack at:
<a href="https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log">https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log</a></p>
<h2>Docker &amp; Virtual Machines</h2>
<p><strong>Every build runs in a new VM</strong> (which is destroyed right after the build),
not just in a new container! This allows us to grant you full control over <code>Docker</code>
and the whole environment.</p>
<p>When your build starts on the Docker based Stack we volume mount the <code>/var/run/docker.sock</code> socket
into your container (similar to calling <code>docker run -v /var/run/docker.sock:/var/run/docker.sock ...</code>;
you can find a description about this access granting method at:
<a href="https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/">https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/</a>).
<em>Note: The <code>docker</code> binary have to be installed inside the base Docker image
(we install Docker in every one of our Docker images so that you don't have to do anything if you use our image,
or you base your own image on our Docker images),
because docker started to migrate from a single-binary solution to dynamically loaded components,
and simply sharing the <code>docker</code> binary is not sufficient anymore.</em></p>
<p>This means that you have access to <code>docker</code> in your container, and can use other tools which use docker,
like <a href="https://docs.docker.com/compose">docker-compose</a>.
You can, for example, configure and run tests and other automations on website projects using <code>docker-compose</code>.</p>
<p>You can call <code>docker info</code>, <code>docker build</code>, <code>docker run</code>, <code>docker login</code>, <code>docker push</code>,
etc. exactly how you would on your own machine.</p>
<h3>Shared volumes</h3>
<p>!!! warning
<strong>Important Note if you want to run <code>docker</code> in your build, and share volumes</strong>: because of how <code>docker</code> handles volume sharing,
only those volumes can be shared which are shared with the base docker container (the one your build is running in).
Everything under <code>/bitrise</code> can be mounted as a volume, but no other path is guaranteed to work with <code>--volume</code> mapping.</p>
<p><strong>Practically this means</strong> that if you use the standard paths and you use relative paths to mount volumes it'll work as expected,
as the default source code directory is located inside <code>/bitrise</code> (by default it's <code>/bitrise/src</code> in our Docker images).
<strong>What won't work</strong> is if you change the source code directory to be located <strong>outside</strong> of <code>/bitrise</code>,
or you want to mount a folder with an absolute path outside of <code>/bitrise</code>.</p>
