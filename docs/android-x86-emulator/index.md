<p>A frequent question is whether it's possible to run the Android x86 emulator, instead of the ARM emulators.</p>
<p>As an experiment we now allow all the required nested virtualization bits for the x86 Android emulators <strong>on the Linux/Android stacks</strong>, which means that we can use the virtualization that the host machine has for running an emulator with x86 architecture, and we can thus skip the slow emulation. This is still 10-15% slower than when run on a physical machine, but it is still much faster than the armv7-a emulator.</p>
<p><strong>This feature is only available on the Linux/Android stacks</strong> right now.</p>
<h2>Alternatives (for other stacks)</h2>
<p>For now, the best workaround seems to be <a href="https://www.ravellosystems.com/">Oracle's Ravello</a> ( <a href="https://www.ravellosystems.com/blog/android-emulator-on-amazon-ec2-and-google-cloud/">a related blog post</a> )
if you need a full emulator (with UI),
or <a href="http://robolectric.org/">robolectric</a> for unit tests.</p>
<p>Another alternative might be to use a service like <a href="https://aws.amazon.com/device-farm/">AWS Device Farm</a> or <a href="https://openstf.io/">Open STF</a>,
where you can run the tests on real devices instead of in an emulator. Bitrise integrations are available for both those services.</p>
<p>If you know about any other, <a href="https://www.bitrise.io/contact">feel free to contact us</a>!</p>
