<p>If you can't see the nice little green/red CI checks status (like the one you can see on our <a href="https://blog.bitrise.io/pull-request-support-for-github">Blog,
about the Pull Request status feature announcement</a>)
on the Pull Request's GitHub page, you should check this list for troubleshooting.</p>
<h2>Make sure to select a Service credential User who has a connected GitHub account</h2>
<p>The first requirement is that the <strong>Service credential User</strong> of the app on <a href="https://www.bitrise.io">bitrise.io</a>
have to connect his/her GitHub account, or else <a href="https://www.bitrise.io">bitrise.io</a>
won't be able to send the status messages to GitHub.</p>
<p>!!! note &quot;Set the Service credential User for the app&quot;
You can set which Team Member's service connections should be used when Bitrise tries to communicate
with GitHub or any other connected service (like Bitbucket or Xamarin) API.
You can set this user on the <code>Team</code> tab of the app, in the <strong>Service credential User</strong> section.
Default is to use the Owner's credentials.</p>
<p>If you want to manage your connected services on <a href="https://www.bitrise.io">bitrise.io</a>,
just open your <a href="https://www.bitrise.io/me/profile">Account Settings</a> page.
On the left side you can find the <strong>Connected Accounts</strong> section,
where you can connect and disconnect other services (like GitHub, Bitbucket or Xamarin)
to your <a href="https://www.bitrise.io">bitrise.io</a> account.</p>
<p>!!! note &quot;Make sure you connected the correct GitHub account&quot;
If you have more than one GitHub account you should also check whether you connected the right one,
which can access the repository.
You can check which GitHub user you connected by clicking the <code>GitHub</code> text
on your <a href="https://www.bitrise.io">bitrise.io</a> <a href="https://www.bitrise.io/me/profile">Account Settings</a> page,
it will open the connected GitHub user's page.</p>
<h2>If your builds are triggering, but you don't see the Pull Request / Build status indicator on GitHub</h2>
<p>If you have Pull Request testing enabled you should see a green/yellow/red CI check status indicator at every Pull Request on GitHub,
<a href="http://blog.bitrise.io/2015/04/23/pull-request-support-for-github-repositories.html">like the one you can see on our Blog about the Pull Request status feature announcement</a>.</p>
<p>If your builds are running fine but you still can't see the status indicator on GitHub:</p>
<ul>
<li><strong>Make sure that you granted access to your GitHub organization for Bitrise</strong>.
It might be that you did not <strong>grant access</strong> to the GitHub organization
(who owns the repository) for Bitrise, so even though everything else is in place,
GitHub will still reject the status message <a href="https://www.bitrise.io">bitrise.io</a> sends to it.
See the
<a href="/faq/grant-access-to-github-organization">Grant access to a GitHub Organization</a>
guide for more information.</li>
<li>Another thing might be that the user you specified as the
<a href="#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account">Service credential User</a>
doesn't have <strong>administrator rights</strong> on GitHub <strong>for the repository</strong>.
<em>Administrator rights are required in order to send status messages to GitHub.</em>
Usually you face this issue (no access to the organization) when you add your app on <a href="https://www.bitrise.io">bitrise.io</a>.
If you did not select the repository from the GitHub list on the <a href="http://www.bitrise.io/apps/add">Add New App</a> page,
but rather copy-pasted your repository's URL, you still need to grant access to the organization to see
the build status indicator on GitHub.
See the
<a href="/faq/grant-access-to-github-organization">Grant access to a GitHub Organization</a>
guide for more information, and make sure that you selected the right
<a href="#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account">Service credential User</a>
for the app on <a href="https://www.bitrise.io">bitrise.io</a>.</li>
<li><strong>If you renamed or transferred the repository on GitHub</strong>.
GitHub in general is quite good with handling repository rename and transfer,
and usually redirects to the right url automatically, but this is not the case with the Status API.
Fortunately the fix for this is quite simple: <strong>Go to the <code>Settings</code> tab of your app on <a href="https://www.bitrise.io">bitrise.io</a>
and make sure that the <code>Repository URL</code> is up to date</strong>, and does not point to the previous location of the repository,
but to the current location of the repository.</li>
</ul>
