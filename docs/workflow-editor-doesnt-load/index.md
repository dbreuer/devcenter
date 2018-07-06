<p>This can happen if you modified the <code>bitrise.yml</code> / workflow configuration in a way which crashes the Workflow Editor UI.</p>
<p>If this would happen please <a href="https://www.bitrise.io/contact">contact us</a> so we can fix the issue in the UI code,
then you can fix the <code>bitrise.yml</code> through our API.</p>
<p>You can find an example of how the API works <a href="https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/upload_download_bitrise_io/bitrise.yml">on GitHub</a>.
In short, you can use a simple <code>curl</code> call to download &amp; to upload an app's config / <code>bitrise.yml</code> to <a href="https://www.bitrise.io">bitrise.io</a>.</p>
<p>With the Bitrise API you can download the <code>bitrise.yml</code> from <a href="https://www.bitrise.io">bitrise.io</a> even if it breaks the Workflow Editor UI,
fix it locally and then upload the fixed <code>bitrise.yml</code> with another API call. For this all you need is a Personal Access Token, which you can generate on your <a href="https://www.bitrise.io/me/profile#/security">account's security tab</a>.</p>
<p>To download the <code>bitrise.yml</code> please check the <a href="/api/v0.1/#get-appsapp-slugbitriseyml">related section of the Bitrise API documentation</a>.</p>
<p>!!! note &quot;Where to get the App Slug and API Token?&quot;
You can find both the app's App Slug and the API Token on the <code>Code</code> tab of the app
on <a href="https://www.bitrise.io">bitrise.io</a>.</p>
<p>Save the <code>bitrise.yml</code> into a file, fix it, then you can upload it with another <code>curl</code> call.</p>
<p>To upload the <code>bitrise.yml</code> please also follow the <a href="/api/v0.1/#post-appsapp-slugbitriseyml">related part of the Bitrise API documentation</a>.</p>
<p><em>Note: make sure that you set the right <code>path/to/bitrise.yml</code> - specify the path of
the <code>bitrise.yml</code> file where you saved the fixed <code>bitrise.yml</code>!</em></p>
