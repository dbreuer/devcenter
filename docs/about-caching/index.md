<p>The caching will tar all the cached directories and dependencies and store them securely in Amazon S3.
Note that if you store files which are downloaded from a CDN / cloud storage you might not see any improvement,
as downloading it from the Bitrise Build Cache storage will probably take about the same time as downloading
it from its canonical CDN / cloud storage location.
However Bitrise Caching still might help if you have reliability issues with the resource's, or dependency's canonical download location.</p>
<p>!!! note &quot;Cache Expiring&quot;
The Build Cache related to a <em><strong>specific branch</strong></em> expires / is auto-deleted after 7 days,
<strong>if there's no new build on that branch in the meantime</strong>.</p>
<pre><code>This means that __if you do builds on a specific branch every day__ (more frequently than a week),
__it'll never expire / will never be deleted automatically__,
but if you don't start a build on that specific branch for more than 7 days then the related cache
will be removed, and your next build will run like the first time, when there was no cache for that branch yet.
</code></pre>
<h2>Setup</h2>
<p>All you need to get started is adding two Steps to your Workflow:</p>
<ul>
<li>One for downloading the previous cache (if any): <code>Cache:Pull</code></li>
<li>One for checking the state of the cache and uploading it if required: <code>Cache:Push</code></li>
</ul>
<p>You should add the <code>Cache:Pull</code> (download) step right before you'd use the cache.
For example, in case of an iOS app, this can be between the <code>Git Clone</code> and the <code>CocoaPods</code> install steps.
If you intend to cache your <code>./Pods</code> directory you should not pull the cache before the <code>Git Clone</code>,
because <code>Git Clone</code> will create the base directory for <code>./Pods</code>.
Before the <code>Git Clone</code> step your code (and the directories your code creates when git cloned) is not available on the Virtual Machine.</p>
<p>The <code>Cache:Push</code> step can be the very last step in the Workflow.
The only thing you have to care about is that it should be after the step(s) which update the cached paths.
For example in case of <code>CocoaPods</code> you should put the <code>Cache:Push</code> step anywhere after the <code>CocoaPods</code> install,
because that's the step which generates, or updates the directory (<code>./Pods</code>) which is cached.</p>
<h2>Example build cache configurations</h2>
<p>You can find example build cache configurations / guides at:
<a href="https://discuss.bitrise.io/tags/build-cache">discuss.bitrise.io/tags/build-cache</a></p>
<h2>Downloading and deleting caches</h2>
<p>You can download and delete caches, for every branch which generated a cache,
on the <code>Settings</code> tab of the app, under the <code>Manage Build Caches</code> section.</p>
<p>!!! warning &quot;Delete a single branch's cache&quot;
If you only want to delete the cache which is related to a single branch,
you should also delete the default branch's cache too!
For more detail see the
<a href="#if-a-build-runs-on-a-branch-which-doesnt-have-a-cache-yet-itll-get-the-maindefault-branchs-cache">If a build runs on a branch which doesn't have a cache yet, it'll get the main/default Branch's cache</a>
section.</p>
<p>!!! note
You can see the size of the caches and the last time a given cache was used in the popup.</p>
<h2>Technical notes</h2>
<p>The Build Cache feature is split into two parts, the <code>Build Cache API</code> and the <code>Steps</code>.</p>
<p>The <code>Build Cache API</code> is actually a really simple API, with only one responsibility:
you can request a download or an upload URL from the API.
Of course it also makes sure that you have the required access rights to the resource (Build Cache Archive),
but other than that its only responsibility is providing the secure - time limited and expiring - download and upload URLs.
It does not process the files.</p>
<p>The <code>Steps</code> are the place where the &quot;magic&quot; happens.
The whole logic of comparing caches to see if there was any relevant change and creating the cache archives is done by the Steps.
This also means that you can write your own Steps and implement your own comparison and compression logic.
The step just has to use the Build Cache API to get download and upload URLs, there's no restriction on the cache file format or on its content.</p>
<p>!!! idea &quot;Advanced notes&quot;
* You can create your own Cache steps
* You can create and use your own Build Cache server and API</p>
<h3>The cache might or might not be available</h3>
<p>You should write your code in a way that it won't fail if the cache can't be accessed.</p>
<h3>The cache is downloaded over the internet</h3>
<p>Which means that if you store files which are downloaded from a CDN / cloud storage you might not see
any speed improvement,
as downloading it from the Bitrise Build Cache storage will probably take about the same time as
downloading it from it's canonical CDN / cloud storage location.</p>
<p>One important note: storing a dependency in Bitrise Build Cache might help if you have <strong>reliability</strong>
issues with the resource's / dependency's canonical download location.
Popular tools / dependencies might get rate limited (<a href="https://github.com/Medium/phantomjs/issues/501">example: PhantomJS</a>).
CDN servers might have availability issues, like jCenter/Bintray. A few examples: <a href="http://status.bitrise.io/incidents/gcx1qn5lj7yt">#1</a>, <a href="http://status.bitrise.io/incidents/3ztgwxvwq7rm">#2</a>, <a href="http://status.bitrise.io/incidents/dqpby9m1n274">#3</a>.
If that's the case, storing the dependency in Bitrise Build Cache might help.
It might not improve the build time but <strong>it definitely can improve the reliability</strong>.</p>
<h3>The cache is stored as one archive file</h3>
<p>So if you have multiple paths you want to cache and any
of the paths gets updated <strong>it'll update the whole cache archive</strong>,
including all the paths you cache.</p>
<h3>If a build runs on a branch which doesn't have a cache yet, it'll get the main/default Branch's cache</h3>
<p>The build on a non default branch, to speed up things,
can (read-only) access the <code>primary</code> branch's cache, until a successful
build on the new branch. Once a build on the new branch
pushes a cache, new builds on that branch will get the branch's cache.
<em>Caches are stored and available for every branch separately.</em></p>
<p>!!! note &quot;Default branch&quot;
You can see which is your <strong>default branch</strong> on your
<a href="https://www.bitrise.io">bitrise.io</a> app's <code>Settings</code> tab.</p>
