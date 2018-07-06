<p>If you are looking for a deployment service that also gives you lots of insights
about your application, then <a href="https://www.testfairy.com/">TestFairy</a> is a great service to check out.</p>
<h1>What is TestFairy?</h1>
<p>When testing apps in the crowd, you never know what exactly was tested and what exactly went wrong on the client side.
TestFairy solves this problem by providing a video of everything that happened on the mobile device,
including detailed internal metrics such as CPU, memory, GPS, network, logs, crash reports, and a lot more.
To get these insights on iOS you need to <a href="http://docs.testfairy.com/iOS_SDK/Integrating_iOS_SDK.html">integrate their iOS SDK into your app</a>.</p>
<h1>Upload your app to TestFairy through Bitrise</h1>
<p>To deploy your app on the TestFairy platform you just simply need to add the <code>TestFairy</code> step
to your app's workflow (on <a href="https://www.bitrise.io">bitrise.io</a>).</p>
<p><img src="/img/tutorials/deploy/testfairy_workflow-editor.png" alt="Deploy to TestFairy step in a Workflow"></p>
<p>The only required parameter you have to add is your API Key on TestFairy.
To get it you should navigate to your <a href="https://app.testfairy.com/settings/">account preferences</a> on TestFairy
and find the key under your API Key menu.</p>
<p>!!! note
You can also enable or disable the email notifications and set the tester groups you would like to notify.
There's an option to make your users always upgrade to the latest build by enabling Auto update in the step,
and you can also start recording video and set the length of it.</p>
<h1>Ready to go!</h1>
<p>There's nothing else you need to do,
simply work on your awesome app and we ensure your app is automatically deployed to TestFairy every time you update your code.</p>
