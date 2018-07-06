<h2>Could not find an android package or you have not accepted the license agreements</h2>
<h3>Error</h3>
<pre><code>&gt; A problem occurred configuring project ':lib'.
   &gt; You have not accepted the license agreements of the following SDK components:
     [Google Repository].
     Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
     Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html
</code></pre>
<p>or</p>
<pre><code>Could not find com.android.support:appcompat-v7:24.2.0.
</code></pre>
<h3>Solution</h3>
<p><strong>Please use the <code>Install missing Android tools</code> step. The section below is kept only for referencing purposes!</strong></p>
<p>The error means that your build requires an Android package which is either not (yet) preinstalled
(<em>you can see which packages are preinstalled <a href="https://github.com/bitrise-docker/android/blob/master/Dockerfile#L30">here, on GitHub</a> -
feel free to send us a Pull Request if you'd want to add a new preinstalled package!</em>),
<strong>or outdated</strong>.</p>
<p>The solution is quite simple, you just have to install/update the related package(s).
To do that add a <code>Script</code> step to your workflow -
should be before the step where you get the error, it can be the very first step in the workflow -
with the following content:</p>
<pre><code>#!/bin/bash
# fail if any commands fails
set -e
# debug log
set -x

# For newer Android SDK:
sdkmanager &quot;extras;android;m2repository&quot;
sdkmanager &quot;extras;google;m2repository&quot;

# For older Android SDK:
echo y | android update sdk --no-ui --all --filter extra-android-m2repository | grep 'package installed'
echo y | android update sdk --no-ui --all --filter extra-google-m2repository | grep 'package installed'
</code></pre>
<p>In most cases you don't need both packages to be updated, so you can try to remove them one
by one, but having all three in the script covers most of the cases related to this error.</p>
<p>!!! note &quot;We update the preinstalled Android packages on every weekend&quot;
so if the error is related to an outdated package, the workaround
we describe here can be removed from your build after that weekend's update.</p>
<h3>Alternative solution for the license error</h3>
<p><strong>Please use the <code>Install missing Android tools</code> step. The section below is kept only for referencing purposes!</strong></p>
<p>An alternative solution for the <code>You have not accepted the license agreements of the following SDK components</code>
error, as printed in the log:</p>
<pre><code>Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
  Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html
</code></pre>
<p>You can find more info at the link printed in the log (<a href="http://d.android.com/r/studio-ui/export-licenses.html">http://d.android.com/r/studio-ui/export-licenses.html</a>),
but in short this can be done by:</p>
<p><strong>Locate the licenses on your Mac/PC</strong>:</p>
<blockquote>
<p>If you have accepted the license agreements on one workstation, but wish to build your projects on a different one,
you can export your licenses by copying the accepted licenses folder from the Android Sdk Home
folder (this should be located at <code>&lt;android sdk home path&gt;/licenses</code>) of your current workstation,
to the Android Sdk Home directory of the machine where you now want to build your projects.</p>
</blockquote>
<p><strong>Create an <code>android-licenses</code> directory in the root directory of your git repository,
and copy the license files into this directory</strong>,
then in your Workflow copy the licenses to the right location using a <code>Script</code> step.</p>
<p><strong>Add the <code>Script</code> step right after the <code>Git Clone</code> step</strong> (that's when your code is available
on the build virtual machine), with the content:</p>
<pre><code>#!/bin/bash
# fail if any commands fails
set -e
# debug log
set -x

rsync -avhP ./android-licenses/ &quot;$ANDROID_HOME/licenses/&quot;
</code></pre>
<p>That's all, this script copies the licenses from the <code>android-licenses</code> (from your repository)
into the system's Android SDK Home path under <code>licenses</code> directory.</p>
<h2>Install an additional Android package</h2>
<p>Please see <a href="/android/android-tips-and-tricks/#how-to-install-an-additional-android-sdk-package">this section</a>.</p>
