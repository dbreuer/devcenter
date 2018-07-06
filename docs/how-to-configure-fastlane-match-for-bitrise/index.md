<p>If you want to use <a href="https://github.com/fastlane/fastlane/tree/master/match">fastlane match</a>
in your <a href="https://www.bitrise.io/">bitrise.io</a> build you only have to do three things:</p>
<ol>
<li>Make sure that a single SSH key can be used to <code>git clone</code> both your main repository (the one
you register on <a href="https://www.bitrise.io/">bitrise.io</a>) and the <code>match</code> repository.
You can find more info <a href="/faq/adding-projects-with-submodules/">in this guide</a>.</li>
<li>Add an environment variable <code>MATCH_PASSWORD</code>, as
<a href="https://github.com/fastlane/fastlane/tree/master/match#encryption-password">described in <code>match</code>'s docs</a>,
to specify the <code>Encryption password</code> you used for <code>match</code>.
On <a href="https://www.bitrise.io/">bitrise.io</a> you should add this as a <code>Secret Environment Variable</code>,
in the <a href="http://devcenter.bitrise.io/docs/add-your-first-step-to-your-apps-workflow">Workflow Editor</a>.
<em>Make sure to <strong>disable</strong> the <code>Replace variables in input?</code> option of the environment
variable, to not to cause issues when the value includes the <code>$</code> (dollar) sign, which is used
for environment variable expansion.</em>
<img src="/img/tips-and-tricks/fastlane-match-password-secret-env.png" alt="Screenshot - Fastlane match secret env var setup"></li>
<li>Make sure to use <code>match</code>'s <code>readonly</code> mode, or else <code>match</code> will try to connect
to the Apple Developer Portal, which requires further authorization (providing additional
username and password for Apple Dev Portal login)!
<ul>
<li>If you use <code>match</code> in your <code>Fastfile</code> or <code>fastlane</code> config: <code>match(app_identifier: &quot;my.domain&quot;, type: &quot;appstore&quot;, readonly: true)</code></li>
<li>If you use it as a command line tool: <code>match development --readonly</code></li>
<li>More info in <code>match</code>'s <a href="https://docs.fastlane.tools/actions/match/">official readme / docs</a></li>
</ul>
</li>
</ol>
<p>That's all, you can now enjoy the utility of <code>match</code>, automated with <a href="https://www.bitrise.io/">bitrise.io</a> 🚀</p>
