<p>After successfully adding your Xamarin application we will create a default workflow (build configuration) for you.
This workflow includes a <code>Deploy to bitrise.io</code> step by default.</p>
<p>Building the default workflow will checkout your git repository,
archive your application and move all the generated applications ( <code>ipa</code> / <code>apk</code> ) to the deployment folder.
After the archive the <code>Deploy to bitrise.io</code> step will upload these files to Bitrise.</p>
<p>We will not just upload your application,
but send out an email to your team as well.
They can simply open the email from their mobile device and install the application from there.
Also you can send out the build to any tester by providing their email address.</p>
<h2>But what if you are already using or want to use another deployment service?</h2>
<p>Besides the default Bitrise deployment we have <a href="http://www.bitrise.io/integrations#?filter=deploy">dozens of other services integrated</a> to Bitrise.
You can simply modify your workflow and add the ones you would like to,
like <a href="http://hockeyapp.net/">HockeyApp</a>, <a href="/tutorials/deploy/publish-your-app-to-appaloosa/">Appaloosa</a>
or <a href="/tutorials/deploy/deploy-to-testfairy-with-bitrise/">TestFairy</a> -
just filter by the <code>deploy</code> tag in the list to see all the available deployment steps.</p>
<p>Simply add the integration Step you want to use instead of the <code>Deploy to bitrise.io</code> step or after that
(but in any case after the <code>Xamarin Archive</code> step, as that's the step which generates the
deployable artifact - <code>.ipa</code>, <code>.apk</code>, ...), and fill out the parameters of the step.</p>
<p>The next time you start a build your app will be deployed to the service of your choice!</p>
<h2>Code signing</h2>
<h3>Xamarin.Android</h3>
<p>For Xamarin Android project code signing see the <a href="/android/code-signing">Create signed APK on bitrise.io</a> tutorial.</p>
<h3>Xamarin.iOS</h3>
<p><strong>Work in progress</strong> - this section will be updated soon.</p>
<p>Right now the best way to get started with Xamarin.iOS code signing
is to run <a href="https://github.com/bitrise-tools/codesigndoc#one-liner">codesigndoc</a>
and upload the files it generates, or to manually upload the code signing
files you use locally.</p>
<p><em>Code signing files can be uploaded to <a href="https://www.bitrise.io">bitrise.io</a>
in the app's Workflow Editor, under the <code>Code signing &amp; Files</code> section of the editor.</em></p>
