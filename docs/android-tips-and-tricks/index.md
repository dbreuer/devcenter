<h2>What are Gradle tasks and how can I get the list of available tasks in my project?</h2>
<p>A <code>gradle</code> task is a process you can run with <code>gradle</code>.
You can run these tasks by running <code>gradle TASK-TO-RUN</code> in your Command Line / Terminal.</p>
<p>A standard Android Gradle project includes a lot of tasks by default, things like:</p>
<ul>
<li><code>androidDependencies - Displays the Android dependencies of the project.</code></li>
<li><code>assemble - Assembles all variants of all applications and secondary packages.</code></li>
<li><code>assembleAndroidTest - Assembles all the Test applications.</code></li>
<li><code>clean - Deletes the build directory</code></li>
</ul>
<p>You can get the base task list by calling <code>gradle tasks</code> in your Android app's directory,
or to see all the available tasks you can call <code>gradle tasks --all</code>.</p>
<p>Running <code>gradle tasks</code> you'll get a list of available Gradle tasks in the format:</p>
<pre><code>$ gradle task

:tasks

------------------------------------------------------------
All tasks runnable from root project
------------------------------------------------------------

Android tasks
-------------
androidDependencies - Displays the Android dependencies of the project.
signingReport - Displays the signing info for each variant.
sourceSets - Prints out all the source sets defined in this project.

Build tasks
-----------
assemble - Assembles all variants of all applications and secondary packages.
assembleAndroidTest - Assembles all the Test applications.
assembleDebug - Assembles all Debug builds.
assembleRelease - Assembles all Release builds.
...
</code></pre>
<p>You can run any of the tasks on bitrise from a <code>Script</code> step by calling <code>gradle task-name-to-run</code> (for example: <code>gradle assemle</code>)
or by using our <code>Gradle Runner</code> step (<a href="https://github.com/bitrise-io/steps-gradle-runner">https://github.com/bitrise-io/steps-gradle-runner</a>)
and specifying the task as the value of the <code>gradle_task</code> input.</p>
<p><strong>Instead of running <code>gradle</code> directly, you should run the gradle commands through <code>gradlew</code> (the Gradle Wrapper)!</strong>
The <code>Gradle Runner</code> step does this, and as you can see it in the related input description of the step:</p>
<blockquote>
<p>Using a Gradle Wrapper (gradlew) is strongly suggested, as the wrapper is what makes sure
that the right Gradle version is installed and used for the build.</p>
<p><strong>You can find more information about the Gradle Wrapper (gradlew),
and about how you can generate one (if you would not have one already)</strong>
in the official guide at: <a href="https://docs.gradle.org/current/userguide/gradle_wrapper.html">https://docs.gradle.org/current/userguide/gradle_wrapper.html</a>.</p>
</blockquote>
<h2>How to install an additional Android SDK package</h2>
<p><strong>The preferred way to do this is to use the <code>Install missing Android tools</code> step.
Please only use a Script solution if you really have to, as you'll have to update
the Script if the Android tools change (which did happen).</strong></p>
<p>All you have to do is to add a <code>Script</code> step to your workflow,
and use the Android <code>sdkmanager</code> tool to install the additional packages you want to.</p>
<p>As an example, to install the Android SDK v18 and the related <code>build-tools</code> v18.0.1,
you can add a <code>Script</code> step (can be the very first step in the Workflow)
with the following content:</p>
<pre><code>#!/bin/bash
# fail if any commands fails
set -e
# debug log
set -x

# write your script here
sdkmanager &quot;platforms;android-18&quot;
sdkmanager &quot;build-tools;18.0.1&quot;
</code></pre>
<p><strong>You can get the full list of available packages</strong> by running:
<code>sdkmanager --list --include_obsolete --verbose</code>.
You can run this on your own machine if you have <code>$ANDROID_HOME/tools/bin</code> in your <code>$PATH</code>.
If not then you can run it with <code>/PATH/TO/ANDROID-SDK-HOME/tools/bin/sdkmanager ...</code>.</p>
<h2>Enable Gradle debug options</h2>
<p>If your Gradle build fails and you can't find any information in the logs you can try to call it with
<code>--stacktrace --debug</code> flags (ex: <code>gradle ... --stacktrace --debug</code>) to get more detailed logs.</p>
<p>In most cases <code>--stacktrace</code> should be enough, and the <code>Gradle Runner</code> step includes
this flag by default.</p>
<h2>Run a bitrise Android build on your Mac/PC, with Docker</h2>
<p>You can run your build on your Mac/PC, inside the same <code>docker</code> container you use on <a href="https://www.bitrise.io">bitrise.io</a>,
to fully test your build in an identical environment! You can find the detailed guide here:
<a href="/docker/run-your-build-locally-in-docker/">How to run your build locally in Docker</a></p>
<h2>Memory (RAM) limit</h2>
<p>You can specify the amount allowed RAM for the JVM by adding two <strong>Environment Variables</strong> to your Workflow,
e.g. as <code>App Env Var</code>s:</p>
<ul>
<li><code>GRADLE_OPTS: '-Dorg.gradle.jvmargs=&quot;-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError&quot;'</code></li>
<li><code>_JAVA_OPTIONS: &quot;-Xms512m -Xmx1024m&quot;</code></li>
</ul>
<p>This method can be used to limit the allowed RAM the Gradle JVM process can use,
which can be useful in case there's not enough RAM available in the system.</p>
<h2>Emulators</h2>
<p>You can find and use our Android emulator steps to create &amp; boot emulators:
<a href="http://www.bitrise.io/integrations">http://www.bitrise.io/integrations</a>.</p>
<p>First you have to create an emulator with a <code>Create Android emulator</code> step,
where you can set the Android version and a couple of other parameters for the new emulator,
then you can boot this emulator with the <code>Start Android emulator</code> step,
which makes sure that the emulator is booted and ready for subsequent steps.</p>
<h3>Emulator with Google APIs</h3>
<p><strong>Instead of using a Script step to create an android emulator please use the <code>Create Android emulator</code> step!
There are simply too many edge cases to cover here, as well as the commands and working configurations change quite frequently.</strong></p>
<p><em>The section below is kept here for referencing purposes, and might be outdated.</em></p>
<p><strong>Note about Android SDK versions:</strong> at this time there are lots of known issues reported for Android Emulators
with Android SDK version 22 &amp; 23 when combined with Google Play services
(see <a href="http://stackoverflow.com/questions/32856919/androidstudio-emulator-wont-run-unless-you-update-google-play-services">1</a>
and <a href="https://code.google.com/p/android/issues/detail?id=176348">2</a>).
The script above creates an emulator with SDK version 21, which should work properly with Google Play services.</p>
<p><em>There are possible workarounds for newer versions
(see <a href="http://stackoverflow.com/questions/34329363/app-wont-run-unless-you-update-google-play-services-with-google-maps-api-andr">1</a>
and <a href="http://stackoverflow.com/questions/33114112/app-wont-run-unless-you-update-google-play-services">2</a>),
but that requires some customization in your project.</em></p>
<h2>Installing / Using Java version X</h2>
<p>!!! note &quot;Java 8 is now pre-installed&quot;
Java 8 is now the pre-installed Java version on the Bitrise.io Linux Stack.
This section is kept here for future reference, in case you'd need another Java version.</p>
<p><em>If you'd need a Java / JDK version which is not preinstalled on the Android stacks,
you can follow this guide to install it. This example will install Java/JDK 8,
please adapt it to the version you need.</em></p>
<p>If your build requires JDK 8, you can install and activate it with a <code>Script</code> step:</p>
<pre><code>#!/bin/bash
set -ex

add-apt-repository -y ppa:openjdk-r/ppa
apt-get update -qq
apt-get install -y openjdk-8-jdk
update-java-alternatives -s /usr/lib/jvm/java-1.8.0-openjdk-amd64
echo &quot;done&quot;
</code></pre>
<p>That's all, just add the <code>Script</code> step to the Workflow with the content above,
and start a new build. <em>This <code>Script</code> step can be the very first step in the Workflow,
as it does not depend on anything else.</em></p>
