<p>Bitrise has an integrated App Deployment system you can use for App and other build artifact file distribution.</p>
<p>With this you can distribute your iOS and Android app, over the air, for your testers (<strong>even for those who don't have a Bitrise account</strong>)
or you can just use it for archiving your App and other build artifact files (these files will
be available on the related Build's details page).</p>
<h2>How does it work?</h2>
<p>If you want to distribute your iOS App through Bitrise all you need in your App's Workflow,
is an <code>Xcode Archive</code> step to generate the iOS app IPA,
and a <code>Deploy to Bitrise.io</code> step to distribute it.</p>
<p>For Android apps, use the <code>Gradle Runner</code> step to generate the APK, and use the
<code>Deploy to Bitrise.io</code> step to deploy it.</p>
<p>For Xamarin apps use the <code>Xamarin Archive step</code> to create the iOS/Android app,
and use the <code>Deploy to Bitrise.io</code> step to deploy it.</p>
<p>For any other project type, just use the step(s) or script(s) which
can generate the app, and use the <code>Deploy to Bitrise.io</code> step to deploy it.</p>
<p><em><strong>One important thing if you use custom steps/scripts</strong>: the <code>Deploy to Bitrise.io</code>
step by default deploys apps from the <code>$BITRISE_DEPLOY_DIR</code> directory, so make sure that you
move the generated app there, or set the <code>Deploy directory or file path</code> input
of the <code>Deploy to Bitrise.io step</code> to point to the location of the app file.</em></p>
<p>If the app file (<code>.ipa</code> / <code>.apk</code>) is available, the <code>Deploy to Bitrise.io</code> step will
upload it for the Build and <strong>it will be listed on the Build's details page</strong>.
Depending on the <strong>notification settings</strong> you set for the <code>Deploy to Bitrise.io</code> step,
Bitrise.io will also send emails for the Team of the app.</p>
<p>For each deployed app you'll see an information and notifications card on the Build's page,
where you can check the details of the App (title, bundle id, version number, size, etc.)
and you can download or install the App right from the Build's page.</p>
<p><strong>If you built your iOS App</strong> with a Development or Ad-Hock Provisioning Profile,
an additional section will be presented with a list of allowed device identifiers (UDID).</p>
<p>If you or a team member of your App's team register a device for
his/her Bitrise account (you can do this on your <a href="https://www.bitrise.io/me/profile">Account Settings page</a> in the <em>Test Devices</em> section)
and the device's identifier can be found in the Provisioning Profile,
then instead of just presenting the identifier in the list you'll see the user who registered the device and the device's name.</p>
<p>Visiting the Build page from an iOS device (which you registered for your account)
and you'll see an <code>Install</code> button instead of the <code>Download</code> button.
With this <strong>you can install the App on your device directly from Bitrise</strong>.</p>
<p><strong>For Android apps you don't have to register your test devices</strong>,
as Android apps don't have per-device install restrictions. You'll, however,
have to enable the <strong>&quot;Unknown Sources&quot;</strong> option in Android to be able to
install the app/apk from outside of the Google Play Store.</p>
<h2>Public App install page</h2>
<p>If you enable the <strong>Public install page</strong> option (of the <code>Deploy to Bitrise.io</code> step)
for the App, then a <strong>long, random URL</strong> will be available for you,
which you <strong>can be sent even to people who are not registered on Bitrise.io</strong>.</p>
<p>Opening this link you'll see a base description of the
App (title, version, size, supported devices) and an <code>Install</code>
button if you visit the page from an iOS or Android device (depending on the app's
platform of course).</p>
<p>You can share this page with anyone, even if they don't have a Bitrise account,
but <strong>you have to make it sure that they'll actually be able to install it</strong> -
if you don't use an Enterprise Provisioning Profile to build your App,
you have to add every device identifier (UDID) to the Provisioning Profile (just like you do on your Mac),
the iOS App can't be installed on any other device, only on the ones which were
included in the Provisioning Profile the build was signed with.</p>
<p><strong>You can enable or disable the App's public install page any time from the related Build page</strong>
and <strong>you can also set the default state</strong> (enabled or disabled) <strong>in your App's Workflow</strong>
(select the <code>Deploy to Bitrise.io</code> step and set the <code>Enable public page for the App?</code> to <code>false</code>
if you don't want to automatically enable this feature).</p>
<p><em><strong>If you disable the Public install page for the App, then only your App's team members will be able to install the App from Bitrise,
from the Build's detail page!</strong></em></p>
<h2>Notifications and install invites</h2>
<p>On the Build's page you can send install invites for your testers.
You can either send invites for a group of your team (testers, developers, admins or owner) or
(if the <code>Public install page</code> option is enabled) you can send install invites to any email address.</p>
<p><strong>Keep in mind that the install invite email contains the URL of the Public install page.</strong>
If you invite someone who's not in your App's team and then disable the Public install page,
they won't be able to access the install page!
Those who are in your App's team will be redirected to the Build's page if the Public install page is disabled.</p>
<p><strong>You can specify the list of groups and emails for automatic install invite notification</strong> in the App's Workflow.
Similarly to the Public page option just select the <code>Deploy to Bitrise.io</code> step in your Workflow
and specify the list of groups and emails to automatically notify in the <code>Notify: User Groups</code> and <code>Notify: Emails</code> options.</p>
<p>Keep in mind that if you disable the <em>Public install page</em> option,
Bitrise won't send install invite emails for the emails you specify,
only to those who are in the App's Team,
because in this case only your team members can access the App (on the Build's page).</p>
