<h2>How iOS code signing works - if you use Xcode 8 automatic code signing</h2>
<p><em>If you're interested in all of the details, you should check this year's
<a href="https://developer.apple.com/videos/play/wwdc2016/401/">WWDC video which covers the code signing changes</a>.
We'll focus more on the basics and issue resolution here.</em></p>
<p>!!! note &quot;Uploading code signing files to bitrise.io&quot;
Code signing files can be uploaded to <a href="https://www.bitrise.io">bitrise.io</a>
in the app's Workflow Editor, under the <code>Code signing &amp; Files</code> section of the editor.</p>
<p>In short, Xcode 8's automatic code signing works this way:</p>
<ol>
<li>When you do an Archive in Xcode, either in Xcode.app or on a CI server / through Xcode's command line tool (<code>xcodebuild</code>)
it first creates an archive <strong>signed with development code signing</strong>.</li>
<li>Then, when you specify the distribution method (export method) it <strong>resigns the archive with distribution signing</strong>.</li>
</ol>
<p><img src="/img/ios/xcode-organizer-export-method.png" alt="Xcode Organizer - export method selector popup"></p>
<p>This means that if you want to create for example an App Store signed IPA,
on the Mac (e.g. on the <a href="https://www.bitrise.io">bitrise.io</a> virtual machine)
you have to have <strong>both a Wildcard, Team / Development AND the App Store
distribution certificates and provisioning profiles</strong>!</p>
<p>!!! note &quot;Collecting all of these might take quite a bit of time&quot;
but fortunately our updated <a href="https://github.com/bitrise-tools/codesigndoc">codesigndoc</a>
can now collect all of these files for you, <strong>automatically</strong>!</p>
<p>So, <strong>is this automatic code signing worth all of this trouble</strong>?
Should you instead opt to use manual code signing in Xcode 8?</p>
<p>In general using Automatic code signing is a good idea, and you should
migrate to it (as Apple suggests this is the new way, how you should do
code signing in the future) if you can.</p>
<p><strong>Is it worth the trouble?</strong> Well, <strong>the good thing about Automatic code signing</strong>
is that once you collected all the code signing files
<strong>it's incredibly easy to use these files / to select the right file(s) during your build!</strong></p>
<p>All you need to do is specifying the &quot;export method&quot; (<code>app-store</code>, <code>ad-hoc</code>, etc.)
in the <code>Xcode Archive</code> step, and that's all! <strong>Xcode will select the right certificate
and provisioning profiles automatically</strong>, based on your project's
Team and Bundle ID (if the signing files are available in the system of course ;) )!</p>
<p><strong>Compare this with the previous solution</strong>, where you had to either create multiple Schemes
in Xcode to be able to control where to use which code signing settings,
or you had to specify &quot;Force Identity / Provisioning Profile&quot; options,
which could lead to even more trouble when not configured properly.
In Xcode 8 automatic code signing you don't have to (actually, you can't)
mess with these configurations, initial code signing is always performed
with Development code signing, and Xcode resignes the IPA during export
based on the &quot;export method&quot;.</p>
<p>And, <strong>it works the same way on <a href="https://www.bitrise.io">bitrise.io</a> too</strong>!
Once you've uploaded all the required signing files (e.g. with <a href="https://github.com/bitrise-tools/codesigndoc">codesigndoc</a>),
all you have to do is to set the <code>export method</code> option
of the <code>Xcode Archive</code> step to the option you want to use.
<strong>That's all!</strong></p>
<p>This is the same as what you do when you create/export an iOS app archive
from Xcode.app - <em>the <code>Xcode Archive</code> step just runs Xcode's command line tool</em>.
There's no &quot;magic&quot; here, <code>Xcode Archive</code> just passes the export options
to Xcode, and Xcode creates the archive and IPA the same way it does on your Mac!</p>
<h3>Migrating your Bitrise configuration to Automatic code signing</h3>
<p>First of all, you should upgrade your steps in your Workflow
to the latest versions - especially the <code>Certificate and profile installer</code>
and the <code>Xcode Archive</code> steps - as there are a couple of features
only available in the latest versions.</p>
<p>The second step is to <strong>remove every previous, now incompatible code signing input
from the <code>Xcode Archive</code> step</strong>.
In general you should try to <strong>reset every code signing related input option of the <code>Xcode Archive</code> step</strong>,
e.g. &quot;Force code signing with Identity&quot; and &quot;Force code signing with Provisioning Profile Specifier&quot;.</p>
<p><em>Note: it might be easier to see which input options you defined a value for in <code>bitrise.yml</code> mode
of the Workflow Editor. Just click on <code>bitrise.yml</code> on the left side of the Workflow Editor
and search for the <code>xcode-archive</code> step. In <code>bitrise.yml</code> only those inputs are listed which
you specified a value for / which are not set to their default value, so it should be pretty
quick to check the list there, easier than on the Web UI.</em></p>
<p><strong>You're almost ready</strong>, really! All you have to do is:</p>
<ol>
<li>Make sure that you've uploaded all the required code signing files, <strong>including a Wildcard Team Development</strong>
certificate and provisioning profile, as noted in the <strong>Description of how Xcode 8's new Automatic code signing feature works</strong> section.
You might want to use <a href="https://github.com/bitrise-tools/codesigndoc">codesigndoc</a> for this,
as it can export all the required files automatically from your Mac.</li>
<li>Set the <code>Select method for export</code> input option of the <code>Xcode Archive</code> step to the
method you want to use (e.g. <code>app-store</code> or <code>ad-hoc</code>)</li>
</ol>
<p><strong>And that's all!</strong></p>
<p><em>You can use multiple <code>Xcode Archive</code> steps to create multiple IPAs signed with different
code signing methods in the same build, just by adding a second <code>Xcode Archive</code> step
and setting the <code>Select method for export</code> option to the other method.
Alternatively you can also use the <code>Re-sign IPA</code> step, to resign the IPA
of a previous <code>Xcode Archive</code> step.</em></p>
<p>One note: if you'd have to use a distribution provisioning profile &amp; certificate
which is related to a different Team, not the one set in your Xcode project's
settings, then you have to specify the <code>The Developer Portal team to use for this export</code>
input option too, or else Xcode will search for code signing files with the same Team ID
you have in your Xcode project's settings. Again, this is the same what you do in
Xcode.app when you create an Archive and export it with a distribution signing - if you're
part of more than one Apple Dev Portal team you'll be prompted to select one.</p>
<p>Another note, especially if your project includes Extension project(s),
for some reason, Xcode 8.0 might not accept just any Wildcard Development Provisioning Profile
for the initial signing. It seems that in case of e.g. a Today Widget Extension
Xcode 8.0 requires the Wildcard <strong>Team</strong> Provisioning Profile,
or a specific development one which includes the Extension's <strong>full</strong> bundle ID.
This might be just an Xcode 8.0 issue which will be fixed in an upcoming Xcode 8 update,
but for now it's best to use the <strong>Team</strong> Provisioning Profile, which you can
export from Xcode Preferences (Xcode -&gt; Preferences -&gt; select your Apple ID on the left side -&gt;
select your Team on the right side -&gt; click &quot;View Details&quot; -&gt; search for
<code>iOS Team Provisioning Profile: *</code> -&gt; right click &quot;Show in Finder&quot;).
<em><strong><a href="https://github.com/bitrise-tools/codesigndoc">codesigndoc</a> can help to
export the proper one in this case too!</strong></em></p>
<p>!!! warning &quot;Make sure you can archive and export on your Mac!&quot;
<code>codesigndoc</code> only works if you can archive and export your app from <code>Xcode.app</code> -
<strong>until you get a signed IPA</strong>!</p>
<p><code>Xcode.app</code> might auto generate files in the background
during the export process, and obviously <code>codesigndoc</code> can only collect those files
after the files are available on your Mac.</p>
<p><strong>This means that you should first Archive the project in <code>Xcode.app</code></strong>,
Export it for the distribution type you want to use (<code>Ad Hoc</code>, <code>App Store</code> or <code>Enterprise</code>),
and <strong>run <code>codesigndoc</code> after you have the <code>.ipa</code> file generated by <code>Xcode.app</code></strong>.
This way <code>codesigndoc</code> can collect all the code signing files
required for that type of distribution.</p>
<p>!!! note &quot;Uploading code signing files to bitrise.io&quot;
Code signing files can be uploaded to <a href="https://www.bitrise.io">bitrise.io</a>
in the app's Workflow Editor, under the <code>Code signing &amp; Files</code> section of the editor.</p>
<h2>How iOS code signing works (Xcode 7 &amp; Xcode 8 manual code signing mode)</h2>
<p>iOS apps require code signing for every action/output which generates an app (<code>.ipa</code>) meant to
run on a physical iOS device.</p>
<p>When you create and export an Archive (<code>.ipa</code>) of your app Xcode will sign it automatically,
based on the <strong>Code Signing</strong> settings you have in your Xcode project. There are, however,
a couple of things you have to know about how Xcode selects the code signing
files (unless you set a specific Identity and/or Provisioning Profile).</p>
<p>If you have a Code Signing configuration in your Xcode project like this one:</p>
<p><img src="/img/ios/recommended-ios-code-signing-settings.png" alt="Recommended iOS Code Signing configuration in Xcode"></p>
<p>where you don't set a specific Identity and Provisioning Profile, Xcode will
select the ones which match the following points:</p>
<ul>
<li>For the <strong>Release</strong> configuration it'll search for a Distribution Identity/Certificate</li>
<li>For the <strong>Debug</strong> configuration it'll search for a Development Identity/Certificate</li>
<li>The Provisioning Profile has to match with the <strong>team ID</strong> and with the <strong>bundle ID</strong> you set
in your Xcode project settings.</li>
</ul>
<p>This means that even if you have a Distribution Identity/Certificate available in the system,
if Xcode can't find a related Provisioning Profile which matches the <em>team ID</em> <strong>and</strong> the <em>bundle ID</em>
you'll get an error like this when you try to archive the project:</p>
<pre><code>Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID ‘...’ were found.
</code></pre>
<p>This means that to be able to Archive your project you have to provide both a Certificate (<code>.p12</code> Identity file)
and a Provisioning Profile which matches:</p>
<ul>
<li>the type of the configuration you set in your Xcode project settings under the <strong>Code Signing</strong> section (Distribution or Development)</li>
<li>the Provisioning Profile has to match both the <em>bundle ID</em> <strong>and</strong> the <em>team ID</em> set in the Xcode project settings</li>
<li>and <strong>the two files have to be compatible with each other</strong> (you
can check this on the <a href="https://developer.apple.com/account/ios/certificate">Apple Developer Portal</a> - select a Provisioning Profile,
click <strong>Edit</strong>, there you can see the Certificates which are allowed to use that specific Provisioning Profile)</li>
</ul>
<p>There can be multiple Certificates/Identities and Provisioning Profiles installed on the system,
the only thing what matters for Xcode when it tries to sign the app is to find a Certificate/Identity and
Provisioning Profile pair which fulfills all the requirements listed above.</p>
<p>!!! note &quot;How to export your iOS Code Signing files&quot;
If you need help with exporting your iOS Code Signing files, you can find
a step-by-step guide with screenshots <a href="https://bitrise.readme.io/docs/provprofile-cert-export">on our old DevCenter</a>.</p>
<h2>How to make the process easier, more manageable? (Xcode 7 &amp; Xcode 8 manual code signing mode)</h2>
<h3>Using Export Options (available for Xcode 7+ and Xcode Archive step v1.9.1+)</h3>
<p>Since the <code>1.9.1</code> version of the <code>Xcode Archive</code> step you can set Xcode &quot;export options&quot;
directly through the step!</p>
<p>The thing you have to know about Xcode's Export Options or how archiving works
when you do it from <code>Xcode.app</code> on your Mac:</p>
<ol>
<li>When you click &quot;Archive&quot; in Xcode first it creates an Xcode &quot;archive&quot; file (directory),
and <strong>it signs the archive with the code signing files set in your Xcode project settings</strong>!</li>
<li>Then, when the Xcode &quot;Organizer&quot; window appears and you click &quot;Export...&quot; and
select an &quot;export method&quot; (App Store, Ad Hoc, Enterprise or Development Deployment)
<strong>Xcode does re-sign</strong> the archive with the final code signing files appropriate for the
export method you selected.</li>
</ol>
<p>This means that if you want to do the same on any Mac (e.g. on <a href="https://www.bitrise.io">bitrise.io</a> virtual machines)
<strong>you'll need the code signing files for the final app/IPA</strong> (e.g. App Store or Ad Hoc distribution certificate and provisioning profile)
<strong>and additionally the code signing files used for the initial signing</strong> (usually Development certificate and provisioning profile)!</p>
<p>To do the same on <a href="https://www.bitrise.io">bitrise.io</a> all you have to do is:</p>
<ol>
<li>Upload all the certificates and provisioning profiles, including the ones required for the initial
code signing (usually your Development certificate and provisioning profile for the project).</li>
<li>Open the Workflow Editor on <a href="https://www.bitrise.io">bitrise.io</a>, select the <code>Xcode Archive</code> step,
and make sure its version is at least <code>1.9.1</code></li>
<li>Go to the step's <code>Select method for export</code> input, and set it to the &quot;export method&quot; you want to use,
just like you would in Xcode's Organizer.
<em>Note: you can add more than one <code>Xcode Archive</code> step to your workflow, if you want to create
e.g. both an Ad Hoc and an App Store signed app/IPA in the same build/workflow!</em></li>
<li>Click <code>Save</code> in the Workflow Editor</li>
</ol>
<p>That's all. Run a new build and you're done ;)</p>
<h3>Full manual / full control</h3>
<p>There's an important &quot;trick&quot; which can make your code signing process much easier
(if you don't or can't use the Xcode 7+ Export Options - as described in the previous section):
Xcode (Xcode's Command Line Tool, <code>xcodebuild</code>) has a command line parameter to
override the Identity and Provisioning Profile configurations set in Xcode project settings!</p>
<p>The <code>CODE_SIGN_IDENTITY</code> parameter can be used to override the <strong>Code Signing Identity</strong>,
while the <code>PROVISIONING_PROFILE</code> parameter can be used to override the <strong>Provisioning Profile</strong> configuration
for any <code>xcodebuild</code> command (e.g. Archive).</p>
<p>Both our <code>Xcode Archive</code> and <code>Xcode Analyze</code> steps include two related inputs,
<code>Force code signing with Identity</code> and <code>Force code signing with Provisioning Profile</code>.
The value you provide for these inputs will be passed to <code>xcodebuild</code>
as <code>CODE_SIGN_IDENTITY</code> and <code>PROVISIONING_PROFILE</code>.</p>
<p><strong>Now, the important bit, that can make your life much easier</strong> (especially if you generate an iOS app with
multiple, different code signing configuration (e.g. if you want to generate both an Ad-Hoc and
an App Store signed <code>ipa</code>)):</p>
<p>!!! note &quot;Setting a specific Identity will make Xcode ignore other search parameters!&quot;
If you set the Identity to <code>iPhone Distribution</code> Xcode will search for a matching Provisioning
Profile which fulfills all the other criteria (team ID and bundle ID),
while <strong>if you provide the full ID of the Identity</strong> like <code>iPhone Distribution: My Company</code>
Xcode will <strong>ignore</strong> everything else and will use that specific Identity (if it can
find it in the system)!</p>
<p>This means that even if the Provisioning Profile has a different <em>team ID</em> set, just by
specifying the Identity's full ID, Xcode will pick the Provisioning Profile
which is compatible with the Identity, it won't check the <em>team ID</em> parameter!</p>
<p>This makes iOS code signing (in most cases) much easier, as all you have to do is:</p>
<ul>
<li>Make sure that you set the Provisioning Profile configuration <em>in your Xcode project settings</em> to &quot;Automatic&quot;,
or else you'll have to override this configuration too (to be able to use different Provisioning Profiles)</li>
<li>You should set the Identity configuration <em>in your Xcode project settings</em> to a generic category like
&quot;iPhone Developer&quot; or &quot;iPhone Distribution&quot; (this is more like a best practice, to make the life of
developers easier, <em>not a requirement if you override the configuration</em>)</li>
<li><strong>And the last piece is</strong>: set the <code>Force code signing with Identity</code> input of Xcode Archive and
Xcode Analyze to the <strong>full ID of the Identity</strong> (something like: <code>iPhone Distribution: My Company</code>)</li>
</ul>
<p><strong>With this setup you don't have to change your code signing configuration in your Xcode project</strong>,
you only have to specify the configuration in your Bitrise workflow, and you can specify
different code signing configuration for every Xcode step if you want to!</p>
<p>!!! note &quot;Where to get these IDs?&quot;
If you use our <strong>Certificate and profile installer</strong> step then you can find the IDs in the step's
log. It prints the ID of every identity and provisioning profile it downloads
and installs successfully. You can copy-paste that ID directly into the
<em><strong>Force code signing with Identity</strong></em> (ID looks like: <code>iPhone Distribution: My Company (Xyz)</code>),
and if you need it, into the <em><strong>Force code signing with Provisioning Profile</strong></em>
(ID looks like: <code>xyz045x4-6143-4e5a-a94a-3fe3aec96eb3</code>) input fields.</p>
<p><strong>Usually it's enough to specify only the Identity ID</strong> for the build, the compatible Provisioning Profile
will be selected by Xcode automatically. Not setting the Provisioning Profile has the advantage
that if you have to update the Provisioning Profile you won't have to update your
Bitrise configuration with the new profile's ID, as long as the Provisioning Profile is
compatible with the Identity you set. But if you'd need to control exactly
which Provisioning Profile should be used for a given step, you can use
the <code>Force code signing with Provisioning Profile</code> input of the steps.
<em>This can be useful if you want to use multiple Distribution Provisioning Profiles
in a single build, <strong>e.g. to create both an Ad-Hoc and an App Store signed app.</strong></em></p>
