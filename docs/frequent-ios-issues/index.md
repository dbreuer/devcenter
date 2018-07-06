<h2>Searching for errors and issues in Xcode generated output</h2>
<p><em>This applies only to the raw, unfiltered output of Xcode.
If you can't find the error reason in the logs make sure to switch the <code>Output Tool</code> option
of the Xcode ... step to <code>xcodebuild</code> (Xcode's Command Line Tool), which will
result in a quite verbose output, but will include everything the way it's produced by
Xcode's command line build tool (<code>xcodebuild</code>). All of the official Bitrise Xcode steps
have an <code>Output Tool</code> input with a <code>xcodebuild</code> option.</em></p>
<p>You should search for <code>error:</code> in the Xcode logs, in 99% of the cases that'll be the one which causes your issues.</p>
<p>If that doesn't work you should also search for <code>warning:</code>, in rare cases Xcode doesn't print an <code>error:</code> even if it fails.</p>
<p>If you have the logs on your own machine then you can run something like this in your Terminal:</p>
<pre><code>grep --color 'error:' my.log
grep --color 'warning:' my.log
</code></pre>
<h2>Xcode Scheme not found</h2>
<p>The first thing you should check if you can't see your Xcode project's scheme
during setup, or if you get a <code>The project named &quot;Foo&quot; does not contain a scheme named &quot;Bar&quot;</code> error during build,
is your Xcode project settings.</p>
<ul>
<li>Check if the desired Scheme is shared</li>
<li>When you share your scheme the Xcode project changes. Don't forget to <strong>commit</strong> and to <strong>push</strong> your changes!</li>
<li>If the related validation is still running on Bitrise abort it and try to run it again.</li>
</ul>
<p><img src="/img/ios/xcode-shared-scheme.png" alt="Xcode shared scheme"></p>
<p><strong>Don't forget to commit &amp; push the changes</strong> if you just enabled the Shared option!
This change should be reflected in your <code>git</code> repository,
under you project / workspace
(which is actually a directory, just seems like a file in Finder):
<code>*.xcodeproj OR *.xcworkspace/xcshareddata/xcschemes/SchemeName.xcscheme</code>.</p>
<p>If you still can't see the desired Scheme,
try to look into your <code>.gitignore</code> file and check if you are ignoring the config files of your Xcode project.</p>
<h2>CocoaPods (missing) dependency issue</h2>
<h3>Error:</h3>
<pre><code>ld: library not found for -lPods-...
clang: error: linker command failed with exit code 1 (use -v to see invocation)
</code></pre>
<p>OR:</p>
<pre><code>no such module '...'
</code></pre>
<h3>Solution:</h3>
<p>Most likely you use Cocoapods but you specified the Xcode project (.xcodeproj) file
instead of the Workspace (<code>.xcworkspace</code>) file. Go to your App's <strong>Workflow tab</strong> on Bitrise,
click <strong>Manage Workflows</strong>, click <strong>App Environments</strong> and change the <code>BITRISE_PROJECT_PATH</code> item.
This will change the default Project Path configuration for every workflow.</p>
<p><strong>If it worked before</strong> and the <code>BITRISE_PROJECT_PATH</code> did not solve the issue,
then check your App's other environments - the project file path might be overwritten by a Workflow environment variable,
or you might have specified a Project Path for the related Xcode step directly.</p>
<h2>Fastlane Export Issue</h2>
<p><em>This section was contributed by <a href="https://github.com/kwoylie">@kwoylie</a>,
and applies if you have a <code>Gemfile</code> in your repository and you use
the <code>fastlane</code> step which uses the <code>Gemfile</code> automatically if present.</em></p>
<p><code>Gemfile</code> content was:</p>
<pre><code>gem &quot;fastlane&quot;, &quot;1.104.0&quot;
gem &quot;gym&quot;, &quot;1.10.0&quot;
gem &quot;badge&quot;, &quot;0.5.0&quot;
gem &quot;CFPropertyList&quot;,&quot;2.3.3&quot;
gem &quot;sqlite3&quot;, &quot;1.3.11&quot;
</code></pre>
<p>I have been battling issues with Fastlane just not letting me export to an enterprise build on
bitrise cloud service. But it works perfectly fine on my colleagues and my machine.</p>
<p>I had disabled xcpretty on Fastlane and got the following error from gym:</p>
<pre><code>$/usr/bin/xcrun /usr/local/lib/ruby/gems/2.3.0/gems/gym-1.10.0/lib/assets/wrap_xcodebuild/xcbuild-safe.sh -exportArchive -exportOptionsPlist '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_config20161003-2206-1f0vw3k.plist' -archivePath /Users/vagrant/Library/Developer/Xcode/Archives/2016-10-03/App\ 2016-10-03\ 05.57.17.xcarchive -exportPath '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_output20161003-2206-wjhjai'
+ xcodebuild -exportArchive -exportOptionsPlist /var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_config20161003-2206-1f0vw3k.plist -archivePath '/Users/vagrant/Library/Developer/Xcode/Archives/2016-10-03/App 2016-10-03 05.57.17.xcarchive' -exportPath /var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_output20161003-2206-wjhjai
2016-10-03 06:01:58.299 xcodebuild[5284:14924] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/App_2016-10-03_06-01-58.298.xcdistributionlogs'.
2016-10-03 06:01:59.596 xcodebuild[5284:14924] [MT] IDEDistribution: Step failed: &lt;IDEDistributionThinningStep: 0x7f868c80f810&gt;: Error Domain=IDEDistributionErrorDomain Code=14 &quot;No applicable devices found.&quot; UserInfo={NSLocalizedDescription=No applicable devices found.}
error: exportArchive: No applicable devices found.

Error Domain=IDEDistributionErrorDomain Code=14 &quot;No applicable devices found.&quot; UserInfo={NSLocalizedDescription=No applicable devices found.}

** EXPORT FAILED **
[06:01:59]: Exit status: 70
[06:01:59]: 2016-10-03 13:01:58 +0000 [MT] Running step: IDEDistributionSigningAssetsStep with &lt;IDEDistributionContext: 0x7f868c51ed70; archive(resolved)='&lt;IDEArchive: 0x7f868c4af8d0&gt;', distributionTask(resolved)='2', distributionMethod(resolved)='&lt;IDEDistributionMethodEnterprise: 0x7f868c202a00&gt;', teamID(resolved)='(null)'&gt;
	Chain (2, self inclusive):
	&lt;IDEDistributionContext: 0x7f868c51ed70; archive = '(null)', distributionMethod='&lt;IDEDistributionMethodEnterprise: 0x7f868c202a00&gt;', teamID='(null)'&gt;
	&lt;IDEDistributionContext: 0x7f868c4b0e70; archive = '&lt;IDEArchive: 0x7f868c4af8d0&gt;', distributionMethod='(null)', teamID='(null)'&gt;
&lt;/IDEDistributionContext: 0x7f868c51ed70&gt;
</code></pre>
<p>This error is a little decieving, thinking it might be a code signing error or
some weird configuration issue with Fastlane.
But if you look further into the error, you may see the following:</p>
<pre><code>2016-10-03 13:01:58 +0000 [MT] Running /Applications/Xcode.app/Contents/Developer/usr/bin/ipatool '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/IDEDistributionThinningStep.s1x' '--json' '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/ipatool-json-filepath-RUCdRR' '--info' '--toolchain' '/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr' '--platforms' '/Applications/Xcode.app/Contents/Developer/Platforms'
2016-10-03 13:01:58 +0000  ruby 2.0.0p648 (2015-12-16 revision 53162) [universal.x86_64-darwin15]
2016-10-03 13:01:59 +0000  /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:181:in `rescue in specs': Your bundle is locked to json (1.8.3), but that version could not be found in any of the sources listed in your Gemfile. If you haven't changed sources, that means the author of json (1.8.3) has removed it. You'll need to update your bundle to a different version of json (1.8.3) that hasn't been removed in order to install. (Bundler::GemNotFound)
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:175:in `specs'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:235:in `specs_for'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:224:in `requested_specs'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/runtime.rb:118:in `block in definition_method'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/runtime.rb:19:in `setup'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler.rb:99:in `setup'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/setup.rb:20:in `&lt;top (required)&gt;'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
2016-10-03 13:01:59 +0000 [MT] /Applications/Xcode.app/Contents/Developer/usr/bin/ipatool exited with 1
2016-10-03 13:01:59 +0000 [MT] ipatool JSON: (null)
</code></pre>
<p>So after alot of investigation, Fastlane reverts back to Mac OS system's ruby for exporting.
But the system ruby doesn't have json 1.8.3 installed.</p>
<h3>Solution:</h3>
<p>To fix this issue, you just have to add a <code>Script</code> step to run the following:</p>
<pre><code>sudo /usr/bin/gem install bundler
</code></pre>
<p>This will install bundler on the system ruby and when the fastlane plugin
calls bundle install then system ruby will also installed the neccessary dependencies</p>
<h2>Works in local but not on Bitrise.io</h2>
<p><em>An example error: <code>ld: file not found ...</code></em></p>
<p>First of all restart your Xcode and try a new build.</p>
<p>If it doesn't help try a <strong>clean build</strong> in Xcode.</p>
<p>If no error was displayed, try resetting your simulator(s).</p>
<p>Another problem could be your CocoaPods version.
Try updating your CocoaPods with the <code>[sudo] gem install cocoapods</code> command.
Also make sure that your <code>Podfile.lock</code> is <strong>committed into your repository</strong>,
as that's the file which describes the exact Pod versions you use.
<em>Without this Bitrise might download newer versions of Pods than the ones you use.</em></p>
<p>If there's still no error try deleting the <code>Pods</code> folder in your project and run the <code>pod install</code> command again.</p>
<p>Finally, if none of the above helped, or you get an error with <code>ld: file not found</code> on Bitrise,
and the path contains <code>DerivedData</code>, with no other error message, like this:</p>
<pre><code>ld: file not found: /Users/vagrant/Library/Developer/Xcode/DerivedData/...
clang: error: linker command failed with exit code 1 (use -v to see invocation)
</code></pre>
<p>Try deleting the Xcode local cache. After that the error should be reproducible on your local machine.</p>
<p>You can delete the local Xcode cache using your Terminal:</p>
<pre><code>rm -rf ~/Library/Developer/Xcode/DerivedData
</code></pre>
<h2>Step hangs (times out after a period without any logs)</h2>
<p>Check whether the scripts you use trigger any GUI prompts or popups, or wait for any user input.
If a script waits for any user input it can cause the build to hang.</p>
<p>Most frequent sources of this issue:</p>
<ul>
<li><code>Xcode</code> (command line tools) might hang if you try to build a Scheme which is not marked as <strong>shared</strong>.
Usually it hangs right after you start any <code>xcodebuild</code> command (e.g. <code>xcodebuild -list</code> or <code>xcodebuild .. archive</code>).
<ul>
<li><strong>Solution</strong>: Please make sure that you marked the Scheme as <strong>shared</strong>,
and that you actually committed &amp; pushed it into your repository.
For more information please follow this guide: <a href="#xcode-scheme-not-found">Xcode scheme not found</a>.</li>
</ul>
</li>
<li>Your script tries to access an item in the OS X Keychain and the item is configured to
ask for permission before access (this is the default type of Access Control configuration
if you add an item - for example a password - to Keychain)</li>
<li>You try to use a script or tool which requires permissions where OS X presents a popup
for acceptance (for example an <code>osascript</code>). You can use a workaround to allow the tool,
without manual interaction by the user, for example by using <a href="https://github.com/jacobsalmela/tccutil">https://github.com/jacobsalmela/tccutil</a>.
<ul>
<li>For example to add <code>osascript</code> to the allowed OS X Accessibility list you can call <strong>tccutil</strong> from
your script (don't forget to include it in your repository or download on-the-fly): <code>sudo python tccutil.py -i /usr/bin/osascript</code></li>
<li>You can download the script from GitHub directly, for example: <code>wget https://raw.githubusercontent.com/jacobsalmela/tccutil/master/tccutil.py</code>.</li>
</ul>
</li>
<li>It can also be <strong>something in your app's code</strong>.
An example: one of our user had a simple <strong>popup in the app, presented only at the first start of the app</strong>.
Once the popup was dismissed, the fact was stored in the app's local storage, and the popup was not shown anymore.
They did dismiss the popup on their iOS Simulator, but on Bitrise every build runs in a brand new,
clean environment, which means that the simulator is in the same state as if you'd hit <strong>&quot;Reset Content and Settings&quot;</strong> in the iOS Simulator's menu.
<ul>
<li><strong>Solution</strong>: try to clean out the simulator/emulator before you'd run the tests on your Mac/PC, to simulate the &quot;first run&quot; experience.</li>
</ul>
</li>
</ul>
<p>It might also be that the build does not hang, <strong>it just doesn't generate any log output</strong>.
This can happen for various reasons;
you can find an example in case of an <a href="https://github.com/bitrise-samples/xcodebuild-piped-output-issue-reproduction">iOS library project</a>.</p>
<h2>CocoaPods frameworks signing issue</h2>
<p>When you get an error something like this:</p>
<pre><code>=== CLEAN TARGET Pods-Xxxxxxxxx OF PROJECT Pods WITH CONFIGURATION Release ===

Check dependencies
[BEROR]Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID “(null)” were found.
[BEROR]CodeSign error: code signing is required for product type 'Framework' in SDK 'iOS 8.1'
</code></pre>
<p>This error is related to how CocoaPods expects code signing configurations for <strong>frameworks</strong>.</p>
<h3>Solution 1: make sure that you upload/include/install a wildcard development provisioning profile</h3>
<p>Usually this issue does not happen on your local Mac, and this is the reason why it does not:
When Xcode performs an initial code signing (when it compiles the framework projects)
it requires a certificate and provisioning profile which can be used for
signing the CocoaPods framework projects.</p>
<p>On your Mac you most likely have your own Development certificate and
<strong>Wildcard</strong> team provisioning profile, which is enough for Xcode to do the
initial code signing for the framework projects.</p>
<p>So, Solution #1 is exactly this, upload these (Development identity/certificate (.p12)
and the Team <strong>wildcard</strong> provisioning profile) to <a href="https://www.bitrise.io">bitrise.io</a>,
and Xcode will work the same way as it does on your Mac.
It'll do an initial code signing with the development signing files,
and then it'll resign the archive when it exports the final IPA.</p>
<h3>Solution 2: modifying code signing settings through <code>Podfile</code></h3>
<p>One of our beloved user sent us the following fix for this problem.
You should add the following script as a <code>Post script</code> to your <code>Podfile</code>:</p>
<pre><code>post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = &quot;&quot;
      config.build_settings['CODE_SIGNING_REQUIRED'] = &quot;NO&quot;
      config.build_settings['CODE_SIGNING_ALLOWED'] = &quot;NO&quot;
    end
  end
end
</code></pre>
<p>You can find a related CocoaPods issue and discussion at:
<a href="https://github.com/CocoaPods/CocoaPods/issues/4331">https://github.com/CocoaPods/CocoaPods/issues/4331</a></p>
<p>You can also find possible solutions at CocoaPod's official GitHub issues page,
like this one: <a href="https://github.com/CocoaPods/CocoaPods/issues/3063">https://github.com/CocoaPods/CocoaPods/issues/3063</a>.</p>
<h2>Installing an Enterprise app: <code>Untrusted Enterprise Developer</code></h2>
<p>If you try to install an Enterprise distribution signed app you might get a
popup when you try to run the app the first time, with the title <strong>Untrusted Enterprise Developer</strong>.</p>
<p><img src="/img/ios/ios-untrusted-enterprise-developer.png" alt="iOS Untrusted Enterprise Developer popup"></p>
<p>Starting with iOS 9 there's no option to &quot;Trust&quot; the developer right from the popup.</p>
<p>You can Trust the developer and enable the app to run in iOS Settings:</p>
<ol>
<li>Open the Settings app on your iPhone or iPad</li>
<li>Select the <code>General</code> category</li>
<li>Select the <code>Profile</code> option
<ul>
<li>starting with iOS 9.2 the option was renamed to <code>Device Management</code> instead of <code>Profile</code></li>
</ul>
</li>
<li>Tap on the Enterprise App option related to the app (the one mentioned in the popup)</li>
<li>Tap the <code>Trust &quot;The Developer's Name&quot;</code> button</li>
<li>A popup will appear, tap on <code>Trust</code> again</li>
</ol>
<p>You should now be able to run the app, and any other Enterprise app from the same developer.</p>
<h2>No dSYM found</h2>
<p>A couple of services require the dSYM to be present for deployment but you might have disabled the dSYM generation in your Xcode project.</p>
<h3>Solution:</h3>
<p>To generate debug symbols (dSYM) go to your <code>Xcode Project's Settings -&gt; Build Settings -&gt; Debug Information Format</code> and set it to <em>DWARF with dSYM File</em>.</p>
<h2>Invalid IPA: get-task-allow values in the embedded .mobileprovision don't match your binary</h2>
<p><strong>Solution:</strong> Generate a new Certificate on the Apple Developer portal, <strong>not</strong> in Xcode.</p>
<p>Another solution might be: make sure you have the proper Signing Identity and Provisioning Profile
in Xcode project settings for both the target and for the project.</p>
<h2>No identity found</h2>
<p>You uploaded the correct <em>Provisioning Profile</em> and <em>Certificate</em> pair,
if you check the identity hash it matches with the one you can see in your Keychain,
but you still get an error like:</p>
<pre><code>22...D11: no identity found
</code></pre>
<p><strong>Solution:</strong></p>
<p>You probably have a configuration in your Xcode project settings which specifies
which keychain should be used for the build,
your scheme might include something like <code>--keychain /../../xxx.keychain</code> code signing flag
and a <code>CODE_SIGN_KEYCHAIN</code> variable set in the <em>.pbxproj</em>.</p>
<p><em>This might happen if you migrate your Xcode Bot based setup into Bitrise.</em></p>
<p>To fix the issue you have to remove the keychain selection configurations from your
Xcode project settings.</p>
<h2>No mobileprovision_path found / No embedded.mobileprovision found in ...</h2>
<p>Error: <code>No embedded.mobileprovision found in ...</code></p>
<p>Or: <code>No mobileprovision_path found</code></p>
<h3>Possible solution 1: <code>Skip Install</code> Xcode Settings</h3>
<p>If you get this error in the Xcode Archive step you should check your Xcode Projects settings. Most likely you have the <code>Skip Install</code> option set to <code>YES</code>.</p>
<p>This should only be used for iOS frameworks, <strong>for iOS apps this should be set to <code>NO</code></strong>.</p>
<p>You can find the official documentation at:
<a href="https://developer.apple.com/library/ios/technotes/tn2215/_index.html">https://developer.apple.com/library/ios/technotes/tn2215/_index.html</a></p>
<ul>
<li>under the <em>Xcode successfully archived my application, but the Archives Organizer does not list my archive</em> section.</li>
</ul>
<h3>Possible solution 2: <code>Installation Directory</code> Xcode Settings</h3>
<p><strong>Another cause of the issue can be</strong> if you (or a tool you use) modifies
the <code>Build Setting -&gt; Deployment -&gt; Installation Directory</code> settings in your Xcode Project.
This can result in an <code>.xcarchive</code> where your app is not generated
into the canonical <code>Products/Applications</code> folder, but instead into a <code>Products/Users/USERNAME/...</code> folder,
including the full absolute path of an intermediate build.</p>
<p><strong>Solution:</strong> Please make sure that the <code>Installation Directory</code> option is set to <code>$(LOCAL_APPS_DIR)</code>
(the default value when you generate a new iOS Xcode Project) or <code>/Applications</code>
(which is the default value of <code>$(LOCAL_APPS_DIR)</code>) in your Xcode Project settings,
and that no build tool you use modifies this option.</p>
<p><em>Huge thanks to <strong>Antje</strong>, who reported this solution!</em></p>
<h2>Duplicated Schemes</h2>
<p>This is quite rare, but worth checking.
If you have multiple Schemes in your Xcode Project or Workspace with the <strong>exact same name</strong>,
when your project is built with Xcode's Command Line Tools Xcode will select one of these Schemes/Configurations,
<strong>randomly</strong>. This can result in random build success / failure,
and if you check the Raw Xcode output you'll see something like this:
<code>xcodebuild: error: Scheme YOUR_DUPLICATED_SCHEME is not currently configured for the test action</code> when it fails.</p>
<p>This might also happen if you use CocoaPods and one of your Pods have the same name as your project.</p>
<p>In any way you can debug this by listing the available Schemes with Xcode's command line tool.
In your project's directory run: <code>xcodebuild -workspace ./path/to/workspace/file -list</code> - or if you use a project file
instead of a workspace file: <code>xcodebuild -project ./path/to/project/file -list</code>.
There should be no duplicated Scheme in the printed list.
You can run this command on your Mac and on bitrise.io too (just add it to a Script step), and ideally you should see the same list.</p>
<h2>System dialog blocks the tests to run</h2>
<p><em>(huge thanks to <a href="https://github.com/AronI">@AronI</a> who reported this issue and the solution)</em></p>
<p>Error:</p>
<pre><code>2016-09-08 07:30:34.535 XCTRunner[6174:22447] Running tests...\
07:30:35.399 XCTRunner[6174:22454] _XCT_testBundleReadyWithProtocolVersion:minimumVersion: reply received\
07:30:35.403 XCTRunner[6174:22453] _IDE_startExecutingTestPlanWithProtocolVersion:16\
2016-09-08 07:30:46.670 XCTRunner[6174:22447] Failed to background test runner within 10.0s.\
** TEST FAILED **\
\
}
</code></pre>
<p>Solution:</p>
<blockquote>
<p>So to put it simply my problem was my UI Tests were failing.</p>
</blockquote>
<p>The steps leading to the failure were the following:</p>
<ol>
<li>Unit tests run and pass. However a few of the unit tests are FBSnapshotTestCase tests
which are kind of UI Tests but are still kept in the unit test bundle.
They launch the app and compare screens with reference images of the screen.</li>
<li>When a FBSnapshot TestCase is run it launches the app and launches
a system alert dialog asking the user for permission for push notifications
(this is just something that's done in the AppDelegate in my app every fresh install).</li>
<li>When the UITests start the permissions dialog is still visible and overlaying the screen.</li>
<li>The application tries to access some XCUIElements but fails because of the overlaying permissions dialog and eventually fails</li>
</ol>
<p>I resolved this by adding a check in the AppDelegate
(where we fire the permissions dialog) if we are running in unit test mode
and only asking for permissions when not running unit tests:</p>
<pre><code>let unitTestMode = NSProcessInfo.processInfo().environment[&quot;XCTestConfigurationFilePath&quot;] != nil
if !unitTestMode {
// IMPORTANT: Only ask permission for push notifications (or any notifications) when not running unit tests.
// The reason for doing this is that it's causing a build failure when the CI runs unit and UI tests.
// The build failure happens like this:
// 1. FBSnapshotTestCase unit tests run and open the application
// 2. The application asks user for the permission to enable push notifications
// 3. FBSnapshotTestCase finish but the permissions dialog is still visible
// 4. UITests start with the permissions dialog overlaying the screen
// 5. UITest doesn't know what the hell is going on and eventually fails because the dialog is blocking everything

// 6.  BUILD FAILURE

askForNotificationPermission()
}
</code></pre>
<blockquote>
<p>This is probably a pretty big edge case but just wanted to report this to you if someone might encounter this problem sometime.
Hopefully this will come to use to someone.</p>
</blockquote>
