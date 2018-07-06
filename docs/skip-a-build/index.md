<p>If you want to skip a specific commit, to not to start a build,
all you have to do is to include either <code>[skip ci]</code> or <code>[ci skip]</code>
in the commit message.</p>
<p>For example, the commit message:</p>
<pre><code>This is not important, please [skip ci]
</code></pre>
<p>won't start a build, nor will:</p>
<pre><code>I just changed the README

[ci skip]
</code></pre>
<p>!!! warning &quot;Only the head/last commit message is checked!&quot;
<strong>If you push more than one commit</strong>, only the last (&quot;head&quot;) commit's
message will be checked for the skip ci pattern!</p>
<p>If you'd decide that you still want to start a build you'll have to
either rebase that commit (e.g. just change its commit message), or push another commit.</p>
<p>!!! note &quot;You can push an empty commit&quot;
Git allows to create and push empty commits, so if you'd decide that you
still want to build a skipped build you can do <code>git commit --allow-empty -m &quot;I decided to run this&quot;</code>
on the related branch and push the commit.</p>
<h2>Pull Requests</h2>
<p>Skip CI works for Pull Requests too, but a little bit differently, due to how Pull Requests are
handled on the git source code hosting services.</p>
<p>In short, what you have to know is that Pull Requests are virtual/temporary &quot;commits&quot; / &quot;branches&quot;.
In case of GitHub there's actually a pull request related &quot;virtual branch&quot; (ref), which, if you know
its name, you can <code>fetch</code> through <code>git</code> (if you add the related <code>refs/</code> to your git <code>fetch</code> config).
This &quot;branch&quot; (ref) is also removed / made unaccessible after you close the pull request.
Other services like Bitbucket doesn't even create this virtual branch / ref, the pull request is just
a virtual data but can't be accessed through <code>git</code> directly.</p>
<p>!!! note &quot;What's the commit message of a Pull Request?&quot;
In any case this means that <strong>the Pull Request itself</strong> is treated as a (virtual) commit,
where <strong>the commit message is the title + description of the Pull Request</strong> and
not the commit(s) of the pull request!</p>
<p>This means that, <strong>if you want to skip a pull request</strong>, you have to include the Skip CI
pattern <strong>in the Pull Request's title or description</strong>, and not in the commit's message!</p>
<p><strong>Once you decide to not to skip the Pull Request / more commits in the pull request</strong>
you can simply remove the
Skip CI pattern from the Pull Request's title or description, which should automatically
trigger a new build with the latest commit, and all future commits of the pull request
will be built too (unless you add a Skip CI pattern again).</p>
