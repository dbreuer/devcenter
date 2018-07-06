<h1>An efficient CI/CD Workflow for iOS development</h1>
<p>To achieve an efficient workflow for rapid iOS app development you have to specify the
automation scenarios and the triggers to start specific scenarios.</p>
<p>Additionally you most likely want to minimize the number of tools, configurations and
manual steps required to achieve your automated development workflow.</p>
<p>To make the whole process as easy as possible (and still flexible enough to support a
broad range of tasks you might want to perform as part of your automation) was one of
the fundamental principles when we started <a href="https://www.bitrise.io/">Bitrise.io</a>.</p>
<h2>Requirements</h2>
<p><a href="http://git-scm.com/">Git</a> is the most popular modern
<a href="http://en.wikipedia.org/wiki/Distributed_revision_control">Distributed Version Control System (DVCS)</a> at the moment,
its branching system provides the flexibility to efficiently organize your app's code repository.</p>
<p>Through <strong>hooks</strong> <em>git</em> is ideal to be the trigger of your automation scenarios, <strong>no other tools required</strong>.</p>
<p>Well, actually there's one more thing: you have to organize your git repository
branches in a way which is easy to manage and also which can be used to identify
what automation scenario should be performed when a change happens on a specific branch.</p>
<h2>Let's do it!</h2>
<p>The most popular git branching model which fulfills these requirements is
<a href="http://nvie.com/posts/a-successful-git-branching-model/">Gitflow</a>.
You can use other branching models but we'll use Gitflow jargon to describe the concepts.</p>
<p>A very minimalistic summary of how Gitflow works:</p>
<ul>
<li>You have two fixed, main branches:
<ul>
<li><strong>master</strong> : it should only contain the code of release versions</li>
<li><strong>develop</strong> : it's the root branch for development, the integration or synchronization branch for developers</li>
</ul>
</li>
<li>You work on <strong>feature</strong> branches:
<ul>
<li>Always start the feature branch from the <em>develop</em> branch.</li>
<li>Once a feature (issue / task) is finished you close the related feature branch, merging
the feature's code back to the integration <em>develop</em> branch.</li>
</ul>
</li>
<li>Once you're ready for a release, you merge from <em>develop</em> to <em>master</em> (through a Gitflow <em>release</em>)</li>
</ul>
<p>With this model you can always see the active tasks (<em>feature</em> branches), the latest &quot;staging&quot; or &quot;beta&quot; code (<em>develop</em> branch) and the released versions (<em>master</em> branch).</p>
<p>Your branches have separate meanings / purposes, which make this branching model a naturally good fit for automation.</p>
<p>So with a branching model like Gitflow and through <a href="/webhooks/">webhooks</a>,
you can define and automate three main scenarios:</p>
<ol>
<li>Change on a <em>feature</em> branch: while a feature is under active development you mostly
want to continuously <strong>test the code</strong>, checking whether it still fulfills
the defined tests, so when it's finished and you merge it back to the <em>develop</em> branch,
it won't break anything.</li>
<li>Change on <em>develop</em> branch: this is the main integration point of finished features / tasks.
If you or your team works on multiple features simultaneously, those independent features might introduce
conflicting changes, so you want to always <strong>test</strong> the code changes on <em>develop</em> to detect these breaking changes.
If the tests do pass, you or your testers might want to give a manual spin for that particular version
of the app, so you configure an <strong>automatic deployment</strong> which should make the version accessible
for those use are in charge of testing the new versions.
It's also a good idea to <strong>notify the testers</strong> when a new test version is available.</li>
<li>Everything worked, your app is rock solid, was tested both automatically with unit and other tests
and manually by your internal testers, and now it's ready for prime time.
Fantastic! Now you can create a <em>release</em>, which in Gitflow will merge the code from <em>develop</em> into
the <em>master</em> branch. As always, just to be absolutely sure, you want to run
your <strong>automatic tests</strong> one last time.
If it passes you want to <strong>build the release version of the App</strong>,
<strong>deploy it</strong> for your external beta testers / your project manager / anyone who agreed
to test your precious app before the App Store submission.
And of course you don't want to forget to <strong>invite your testers</strong>, do you?</li>
</ol>
<p>The beauty of Gitflow (or a similar branching model) is that if you use an automation service
like <a href="https://www.bitrise.io/">Bitrise</a> you can define these scenarios,
connect to the related branches and you'll never have to do these tasks manually.</p>
<p><strong>You can just work on your code</strong>, organized into branches and that's all.
<strong>Everything else will happen automatically</strong>, based on which branch changed.</p>
<h2>Git + Bitrise</h2>
<p>Bitrise is built specifically to help you with this kind of automation.
To achieve an automated workflow like the one described in the previous section this is all what you have to do:</p>
<ol>
<li><strong>Register your App's repository</strong> on <a href="https://www.bitrise.io/">Bitrise</a>
(<em>Don't forget to setup a <a href="/webhooks/">webhook</a>!</em> If you connect your repository through
our GitHub or Bitbucket integration options, Bitrise will do this automatically for you).</li>
<li>Prepare your App's <strong>Primary Workflow</strong> to include the <em>tests</em> you would like to run on every code change.</li>
<li>Create a <strong>new Workflow for your develop branch</strong> and add the <em>deployment</em>
and <em>notification</em> steps you would like to use.
For example, you can use Bitrise's built in App Deployment system
and send email and Slack notifications when a test build is available -
you can find dozens of Steps in our library or you can just add <em>script</em> steps
and do anything you want to.</li>
<li>Create another <strong>Workflow for your master branch</strong> and configure it for
the <em>deployment</em> of release versions, <em>notifying</em> your beta testers or project manager,
maybe even <a href="https://github.com/bitrise-io/steps-sms-text-message">Send a Text message</a>.</li>
</ol>
<p><em>That's all, no other setup is required</em>.
You can customize your Workflows the way you want and you can
<strong>control everything with nothing but your code repository!</strong></p>
<p>!!! note
You can create unlimited number of Workflows
so if you have a more complex branching model
you can configure your automations to support the way you work.</p>
<p>We have a great amount of Steps you can choose from
and <strong>all of these Steps are open source</strong>,
so if you want to modify one or create a brand new Step you can do that too!</p>
