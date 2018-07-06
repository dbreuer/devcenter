<p><strong>Feel free to add your comments to this list.</strong></p>
<p><a href="https://github.com/bitrise-io/devcenter/edit/master/docs/ios/known-xcode-issues.md">You can do it directly on GitHub, by clicking this link</a>,
just don't forget to send it as a Pull Request ;)</p>
<h2>Performance related</h2>
<p><em>Note: mainly affects UI tests.</em></p>
<p>The root cause of the issue is that Xcode / the iOS Simulator has issues
in performance limited environments. This included Virtual Machines (which is
how your builds are running on <a href="https://www.bitrise.io">bitrise.io</a>),
MacBook Airs, Mac Minis with HDD storage, ...</p>
<p>It can happen even if you use
<a href="http://www.openradar.me/23386199">Apple's Xcode Bots CI server</a> on <em>non SSD</em>
Mac Mini.</p>
<p>Examples:</p>
<ul>
<li>UI Tests fail to start</li>
<li>One or more UI Test case hangs</li>
</ul>
<p>Related links &amp; reports:</p>
<ul>
<li><a href="http://stackoverflow.com/questions/36312500/xcode-bot-error-early-unexpected-exit-operation-never-finished-bootstrapping">XCode bot error: Early unexpected exit, operation never finished bootstrapping</a></li>
<li><a href="https://forums.developer.apple.com/thread/20747">UI Testing Failure - Failed to launch within 2.5s, Interrupting test</a></li>
<li><a href="https://forums.developer.apple.com/thread/15209">Assertion Failure: UI Testing Failure - Failed to receive completion for ...</a></li>
<li><a href="https://forums.developer.apple.com/thread/31311">Assertion Failure: UI Testing Failure - Failed to receive completion for XCDeviceEvent: page 12 usage 64 duration 0.01s within 10.0s</a></li>
<li><a href="https://forums.developer.apple.com/thread/31312">UI Testing Failure - Failed to perform AX action for monitoring the event loop</a></li>
<li><a href="https://forums.developer.apple.com/thread/4472">UI Testing Failure due to failed AX Action</a></li>
<li><a href="https://forums.developer.apple.com/thread/28732">Every other test case being skipped - UI Testing Failure - App state for &lt;XCUIApplicationProcess: ...&gt; is XCApplicationStateRunningActive (3), still not XCApplicationStateNotRunning</a></li>
</ul>
<h3>Possible solutions</h3>
<ul>
<li>As reported <a href="http://stackoverflow.com/a/37866825/974381">in this StackOverflow answer</a> &amp;
<a href="https://forums.developer.apple.com/thread/4472">in this Apple dev forum discussion</a>
a possible workaround can be to <strong>not to store <code>XCUIApplication()</code> in a variable</strong>, instead
reference / use it directly. E.g. instead of: <code>let app = XCUIApplication() ; ... ; app.launch()</code>
do: <code>XCUIApplication().launch()</code></li>
<li>Others reported that if you add a delay (<code>sleep(10)</code>) after every <code>app.launch()</code> related to your tests, it can
leave enough time for Xcode / the iOS Simulator to initialize the Accessibility labels,
so that UI Tests can properly find the elements by the Accessibility labels. (<a href="https://forums.developer.apple.com/thread/28732">Related Apple developer forum discussion</a>)
<ul>
<li>Related: remove every explicit <code>app.terminate()</code> in your <code>tearDown()</code> method(s)</li>
</ul>
</li>
<li>Try another Simulator device (e.g. instead of running the test in &quot;iPhone 6&quot;
try it with &quot;iPhone 6s Plus&quot;)</li>
<li><a href="http://stackoverflow.com/a/32481202/974381">Use the Async testing APIs</a></li>
<li>Some users had success with splitting the tests into multiple Schemes,
and running those separately, with separate Test steps.
<ul>
<li>A great article about splitting tests into multiple Schemes:
<a href="http://artsy.github.io/blog/2016/04/06/Testing-Schemes">http://artsy.github.io/blog/2016/04/06/Testing-Schemes</a></li>
</ul>
</li>
<li><a href="https://github.com/fastlane/fastlane/issues/3874#issuecomment-219991408">Sometimes it's related to a code which makes Xcode to misbehave</a></li>
<li>Try another Xcode version.</li>
</ul>
<h2>Flaky UI tests, UI test cases failing randomly</h2>
<p>This can happen with a really simple project too. Even something as
simple as:</p>
<pre><code>func testAddAnItemGoToDetailsThenDeleteIt() {
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.


        let app = XCUIApplication()
        let masterNavigationBar = app.navigationBars[&quot;Master&quot;]
        masterNavigationBar.buttons[&quot;Add&quot;].tap()

        let tablesQuery = app.tables
        let firstElemQuery = tablesQuery.cells.elementBoundByIndex(0)
        firstElemQuery.tap()
        app.navigationBars.matchingIdentifier(&quot;Detail&quot;).buttons[&quot;Master&quot;].tap()
        masterNavigationBar.buttons[&quot;Edit&quot;].tap()

        firstElemQuery.buttons.elementBoundByIndex(0).tap()
        firstElemQuery.buttons[&quot;Delete&quot;].tap()

        masterNavigationBar.buttons[&quot;Done&quot;].tap()

        XCTAssert(tablesQuery.cells.count == 0)
    }
</code></pre>
<p>can trigger this issue.</p>
<h3>Possible solutions</h3>
<p>We could reproduce this issue with the code above, using <code>Xcode 7.3</code>.
The exact same code worked perfectly with <code>Xcode 7.2.1</code> while it randomly
failed with <code>7.3</code>. The solution was to use a different iOS Simulator device.
The test failed <em>2 out of 3</em> on average with the &quot;iPhone 6&quot; simulator device
using Xcode 7.3, while it worked perfectly with Xcode 7.2.1.</p>
<p>Changing the simulator device to &quot;iPhone 6s Plus&quot; solved the issue with <code>Xcode 7.3</code>.</p>
<h2>Xcode Unit Test fails without any error, with exit code 65</h2>
<p>This can be caused by a lot of things, Xcode or some other tool simply
omits / does not present any error message.</p>
<p>You can find a long discussion, with possible reasons &amp; solutions <a href="https://github.com/bitrise-io/bitrise.io/issues/5">here</a>.</p>
<p>A quick summary:</p>
<ul>
<li>First of all, if you use <code>xcpretty</code> to format the output try a build without it
(if you use the Xcode Test step you can set <code>xcodebuild</code> as the &quot;Output Tool&quot; option/input
to not to format the log produced by <code>xcodebuild</code>). The cause is: <code>xcpretty</code> sometimes
omits the error message in it's output. <a href="https://github.com/bitrise-io/bitrise.io/issues/27">Related GitHub issue</a>.</li>
<li>If you don't use our <code>Xcode Test</code> step to run your UI Test you should try to run
it with our Xcode Test step. We always try to improve the reliability of the step,
implementing known workarounds for common issues.</li>
<li>If you use our Xcode Test step: make sure you use the latest version, as it
might include additional workarounds / fixes.</li>
<li>Try <a href="http://devcenter.bitrise.io/docs/available-stacks#section-how-to-switch-to-the-new-beta-stacks">another Xcode version</a>,
there are issues which are present in one Xcode version but not in another one.</li>
<li>Make sure your desired <a href="http://devcenter.bitrise.io/docs/scheme-cannot-be-found">Xcode scheme is shared</a>. Don't forget to commit and push the changes if you just enabled it.</li>
<li>It might also be a <a href="https://github.com/bitrise-io/bitrise.io/issues/5#issuecomment-140188658">project configuration issue in your Xcode project</a>,
or a <a href="https://github.com/bitrise-io/bitrise.io/issues/5#issuecomment-160171566">code issue in your tests</a>,
or a <a href="https://github.com/bitrise-io/bitrise.io/issues/5#issuecomment-190163069">multi threading issue in your code</a>.</li>
<li>We received reports that this might also be caused by Code Coverage report generation,
you can disable the <code>Generate code coverage files?</code> option of the Xcode Test step
to not to generate Code Coverage files.</li>
<li>If the previous steps did not help, you should check the whole discussion and suggested solutions at: <a href="https://github.com/bitrise-io/bitrise.io/issues/5">https://github.com/bitrise-io/bitrise.io/issues/5</a></li>
</ul>
<h2><code>Segmentation fault</code></h2>
<p>The error is:</p>
<pre><code>clang: error: unable to execute command: Segmentation fault: 11
</code></pre>
<p>This is usually due to Xcode version mismatch - that you use a different Xcode on your Mac than the one you use on <a href="https://www.bitrise.io">bitrise.io</a>. Commonly occurs with Xcode 7.2 (if you have the Xcode 7.2 stack selected on bitrise.io), if you're already on a newer version of Xcode locally on your Mac.</p>
<p>The solution is simple, just make sure that you use the same Xcode version everywhere.</p>
<h2>Issues which occur with the Xcode Command Line Tools (<code>xcodebuild</code>), but not with Xcode.app</h2>
<h3>xcodebuild hangs when a test causes EXC_BAD_ACCESS kernel exception</h3>
<p><a href="https://openradar.appspot.com/24222858">xcodebuild hangs when a test causes EXC_BAD_ACCESS kernel exception</a></p>
<p>Note: this can happen only on specific iOS Simulators / iOS versions too, e.g. if the app only crashes on iOS 8, but not on iOS 9</p>
<h3>Xcode 8 - <code>xcodebuild .. test</code> hangs at the very end of the tests</h3>
<p><code>xcodebuild .. test</code> hangs at the end of the tests (after it printed the summary of the tests)
if the output of <code>xcodebuild ..</code> is piped / redirected in any way.
This means that <code>xcodebuild .. test .. | xcpretty</code> or even <code>tee</code> can be used to reproduce this issue.</p>
<ul>
<li><strong>Affected Xcode versions</strong>: so far it seems to be an <code>Xcode 8 beta</code> only issue, and it was fixed in <code>Xcode 8 beta 4</code>.</li>
<li>Related <a href="http://openradar.appspot.com/26872644">radar</a> and <a href="https://github.com/supermarin/xcpretty/issues/227">xcpretty</a> issues.</li>
<li>Workaround: use a <code>Script</code> step instead of the Xcode Test step,
and copy paste the <code>xcodebuild</code> command from the hanging Xcode Test step's log, without <code>| xcpretty</code> etc.
Of course, with this you won't be able to use the built in features the Xcode Test step
provides, but the base <code>xcodebuild</code> command should be able to run, if the output
is not redirected / piped.</li>
</ul>
<h4>Every/Any Xcode command hangs</h4>
<p>This is a rare issue, caused by running a <strong>non shared Scheme</strong>.</p>
<p><code>xcodebuild</code> can only work with <strong>shared Schemes</strong> and user schemes (auto created by Xcode.app).
<code>xcodebuild</code>, unlike Xcode.app, <strong>does not</strong> auto create user schemes, it can only work with
<strong>shared schemes</strong> and already existing user schemes (Xcode.app creates the user scheme when you open
the project in Xcode.app <strong>on the specific Mac machine the first time</strong>, for schemes which are not marked as shared).
If you try to run a command on a missing / non shared Scheme it usually manifests in a &quot;scheme not found&quot;
error, but we saw projects where it resulted in <code>xcodebuild</code> hanging, instead
of an error message.</p>
<p>If this is the case then any <code>xcodebuild</code> command will hang, even something
as simple as <code>xcodebuild -list</code>.</p>
<h5>Solution</h5>
<p><a href="http://devcenter.bitrise.io/v1.0/docs/scheme-cannot-be-found">Make sure that you marked the Scheme as shared, and that you actually committed &amp; pushed it into your repository</a>.</p>
<h2>Build hangs</h2>
<h3>Simulator reset</h3>
<p>As reported <a href="https://github.com/bitrise-io/steps-xcode-test/issues/57#event-796203051">here</a>,
if you do a simulator reset during the build, e.g. with a pre-action
Build Phase Script <code>xcrun simctl erase all</code>, it can cause Xcode / the Simulator to hang.</p>
<h3>Other</h3>
<p>It might also not be Xcode related, but might be caused by something in your
project when it runs in an Xcode step (Xcode Test, Xcode Archive, ...).
For example if you have a Run Phase Script in your Xcode project, that will
run during Xcode build/test/archive, and that script hangs for some reason
(e.g. it waits for a user input).</p>
<p>You can find pointers to identify and solve these kind
of issues <a href="http://devcenter.bitrise.io/docs/step-hangs-times-out-after-a-period-without-any-logs-on-bitrise">on our old DevCenter</a>.</p>
