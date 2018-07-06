<p>You can improve your build times with the following tips.</p>
<p><strong>Feel free to suggest other ways of optimization!</strong></p>
<h2>Include your dependencies in your repository</h2>
<p>Including your dependencies (like CocoaPods) in your repository can speed up your builds.
Once the <code>git clone</code> of your repository is done, everything will be in place to do your build.</p>
<p>For example, in case of CocoaPods, you can delete the CocoaPods Install step from your workflow
if you include your <code>Pods</code> directory <strong>and</strong> the CocoaPods generated <code>.xcworkspace</code> file in your repository.</p>
<p>You can read more about the pros &amp; cons of including your dependencies in your repository at:
<a href="/faq/should-i-commit-my-dependencies-into-my-repository/">Should I commit my dependencies into my repository?</a></p>
<h2>Use the Build Cache</h2>
<p>In some cases using the <a href="/caching/about-caching/">Build Cache</a> feature can also help to speed up your builds.
Note: the efficiency of the Build Cache depends on the size of the files you want to cache,
as well as on the number of files you want to cache.
For more information see the <a href="/caching/about-caching/">Build Cache documentation</a>.</p>
<h2>Turn off the &quot;Clean build&quot; option of Xcode steps</h2>
<p>All of our Xcode steps (Xcode Test, Xcode Archive and Xcode Analyze) have a &quot;Do a clean Xcode build ...?&quot; option.
You can usually turn off this option without causing any issues.</p>
<p>By turning off &quot;clean build&quot; you can speed up subsequent Xcode steps.
The first one will still have to do a full, clean build, because there's no build cache at the time it runs
(as every build runs in a brand new, clean Virtual Machine, as descibed in <a href="/getting-started/code-security/">Code Security</a>),
but subsequent Xcode steps can use the build cache of the previous Xcode step(s), reducing the compilation time of the step.</p>
<h2>Other</h2>
<p><strong>Feel free to suggest other ways of optimization!</strong></p>
<ul>
<li><a href="http://khanlou.com/2016/12/guarding-against-long-compiles/">Guarding Against Long Compiles</a></li>
</ul>
