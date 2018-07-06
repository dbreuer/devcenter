<p>Steps to grant access for Bitrise.io to a given GitHub Organization:</p>
<ol>
<li>Open <a href="https://github.com">https://github.com</a></li>
<li>In the top right corner click your user / avatar</li>
<li>In the list select <a href="https://github.com/settings/profile">Settings</a></li>
<li>On the left side select <a href="https://github.com/settings/applications">Authorized applications</a></li>
<li>In the left-side navigation, click <strong>Authorized OAuth Apps</strong>, and choose <strong>Bitrise</strong></li>
<li>Locate the Organization you want to grant access to, and click <code>Grant</code>.</li>
</ol>
<p><img src="/img/faq/authorized-oauth-apps.png" alt="Authorized OAuth Apps"></p>
<p>You can now go back to <a href="https://www.bitrise.io">bitrise.io</a> and you
should see the organization / repository on the Add New App page.</p>
<p><strong>If there's no <code>Grant access</code> button for the organization in the <em>Organization access</em> section</strong>
and instead you see a red cross icon, that means that the access was previously granted but then it was revoked.
You can fix this by selecting the organization on the left side, in the
<strong>Organization settings</strong> section, then on the <em>Organization settings</em>
page select <strong>Third-party access</strong>, locate <code>Bitrise</code>, click the <strong>pencil icon</strong>,
and click the <code>Grant access</code> button there.</p>
<p>!!! note &quot;In case the repository is a fork of another private repository&quot;
In case the repository is a fork of another private repository which belongs to <strong>(another) organization</strong> you
have to repeat these steps and grant access for Bitrise for the orgianization <em>which owns the original repository</em>.</p>
<pre><code>This is a GitHub limitation, in order to be able to access a private repository fork
__you have to grant access for the service (Bitrise) in both repositories__;
in the fork and in the original repository/organization too.
</code></pre>
