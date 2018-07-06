<p>To restore your <a href="https://www.nuget.org/">NuGet</a> packages or <a href="https://components.xamarin.com/">Xamarin Components</a>
simply navigate to the app on <a href="https://www.bitrise.io">bitrise.io</a>,
and select the <code>Workflow</code> tab to open the Workflow Editor.</p>
<h2>Restore Nuget packages</h2>
<p>Add the <code>NuGet Restore</code> step to your workflow, after the <code>Git Clone</code> step.
By default the step will use the same solution file that you have provided when you added your app,
but you can simply modify it if you need to.</p>
<h2>Restore Xamarin Components</h2>
<p>Add the <code>Xamarin Components Restore</code> step, after the <code>Xamarin User Management</code> step.</p>
<p><strong>Xamarin Components requires Xamarin authentication - for more information
please see the <a href="/xamarin/connect-your-xamarin-account-to-bitrise/">Connect your Xamarin account to Bitrise</a> guide!</strong></p>
