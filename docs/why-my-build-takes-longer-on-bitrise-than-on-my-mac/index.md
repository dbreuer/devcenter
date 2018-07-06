<p>First of all you have to determine which step(s) consume significant time,
to identify what can possibly be improved.</p>
<p>If your dependency step (e.g. CocoaPods) is the one which takes a long time then you might be able to speed it up
by using the Bitrise Build Cache feature.
You can find more information at <a href="/caching/about-caching">Using the Build Cache</a>.
This is also true for any step which might include network communication, addressing 3rd party web services,
which might temporarily not be available or might be slow due to high demand.</p>
<p>If the long build time is not related to a dependency step or to a step which accesses a 3rd party service,
and it's related to an Archive or Test step, which only performs calculations on the Virtual Machine
and does not access an outside service then you should check this list which explains
why it might take more time on Bitrise.io than on your Mac/PC:</p>
<h2>Local build caches</h2>
<p>Local build caches on your Mac/PC: most of the tools you use (e.g. Xcode) does generate a lot of local build cache,
to speed up subsequent builds.
These caches help a lot to decrease the build time on your Mac/PC, but these are not available on <a href="https://www.bitrise.io">bitrise.io</a>.</p>
<p><em>Note: You can test how much these caches improve the build time by running the same step (e.g. Xcode Archive) two times during your build.
The second one will be significantly faster than the first one,
because of the available local build caches Xcode generates.</em></p>
<p>On <a href="https://www.bitrise.io">bitrise.io</a> every build runs in a clean Virtual Machine.
No file is stored after your build finishes, the whole Virtual Machine is destroyed,
and the next build will start in a clean Virtual Machine again.</p>
<p><strong>The lack of local build caches is important to improve the reliability of your project</strong>,
but it slows down the build process. Why it's important?
In your local build caches there might be files which are not under version control.
This can result in a situation where although you can build your project on your Mac/PC someone
who just git clones it and builds it the first time will have an error.
You can find more information about this issue at:
<a href="/ios/frequent-ios-issues/#works-in-local-but-not-on-bitriseio">Works in local but not on Bitrise.io</a>.</p>
<p>This issue is eliminated by using clean virtual machines on <a href="https://www.bitrise.io">bitrise.io</a>,
where only the code and dependencies you specify (which are under version control, and are reproducible) are available.
If it works there then it'll work on a brand new Mac/PC too,
when a new colleague joins your team and starts to work on the project.</p>
<h2>Network Resources</h2>
<p>Additionally to Local build caches, if your project requires dependencies
which have to be retrieved from the Internet it'll add time to the build process.</p>
<p>For example, when you build your iOS project on your Mac and you use CocoaPods,
you usually don't have to run <code>pod install</code>, only when your CocoaPods dependency list changes.
If you don't commit your Pods into your repository then this process (to download the required dependencies)
have to be performed for every build in a clean environment.</p>
<p>Possible solutions:</p>
<ul>
<li>Commit your dependencies into your repository -
read more: <a href="/faq/should-i-commit-my-dependencies-into-my-repository">Should I commit my dependencies into my repository?</a></li>
<li>Cache your dependencies in Bitrise Build Cache -
read more: <a href="/caching/about-caching">Using the Build Cache</a></li>
</ul>
<h2>Raw performance</h2>
<p>We always try to improve the overall performance of the build infrastructure,
but you'll most likely have more powerful hardware.</p>
<p>Right now we use a private vSphere network for hosting the OS X virtual machines,
and Google Compute Engine for hosting the Linux (Android) virtual machines.</p>
<p>Cloud environments are fantastic to provide reproducible build environments,
but virtualization requires additional resources on top of the resources exposed to the virtual machine / build environment.
You can try this on your own Mac/PC: running the same compilation directly on your Mac/PC
will be faster than doing it in a Virtual Machine.</p>
<p><em>We do our best to improve the performance whenever we can, and feel free to reach out to us if you have any suggestion!</em></p>
<h2>Tips &amp; Tricks to optimize build times</h2>
<p>You can also find a guide <a href="/tips-and-tricks/optimize-your-build-times">here</a>
about how you can optimize your build times.</p>
