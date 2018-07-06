<p><em>Note: the <code>www</code> endpoint is now deprecated. Please use the <code>https://app.bitrise.io/app/APP-SLUG/build/start.json</code> endpoint instead.</em></p>
<p>With the Build Trigger API you can start a new build of your app with a simple API call.</p>
<p>You can define parameters for the build like what <code>branch</code>, <code>tag</code> or <em>git commit</em> to use
and what <em>build message</em> to present on the Build's details page.</p>
<p>!!! note &quot;Interactive cURL call configurator&quot;
You can find an interactive cURL call configurator by clicking on the <code>Start/Schedule a build</code>
button on your app's <a href="https://www.bitrise.io">bitrise.io</a> page
and switching to <code>Advanced</code> mode in the popup.
At the bottom of the popup you can find a <code>curl</code> call,
based on the parameters you specify in the popup.</p>
<h2>How to start a build by calling the Trigger API?</h2>
<p>You have to call your build trigger with a <code>POST</code> request with a JSON body.</p>
<p>!!! note &quot;API Token and App Slug&quot;
When you use the Bitrise Trigger API you have to specify the App's <code>API Token</code> and <code>App Slug</code>.
You can view both and regenerate your App's API Token anytime you want to,
on the <code>Code</code> tab of the app.</p>
<h2>JSON body</h2>
<p>The JSON body has to contain at least:</p>
<ul>
<li>a <code>hook_info</code> object with:
<ul>
<li>a <code>type</code> key and <code>bitrise</code> as its value</li>
<li>an <code>api_token</code> key and your <em>API Token</em> as its value</li>
</ul>
</li>
<li>a <code>build_params</code> object, with at least a <code>tag</code>, <code>branch</code> or <code>workflow_id</code> parameter specified</li>
</ul>
<p>A minimal sample JSON body, which specifies <em>master</em> as the <code>branch</code> parameter:</p>
<pre><code>{
  &quot;hook_info&quot;: {
    &quot;type&quot;: &quot;bitrise&quot;,
    &quot;api_token&quot;: &quot;...&quot;
  },
  &quot;build_params&quot;: {
    &quot;branch&quot;: &quot;master&quot;
  }
}
</code></pre>
<p><strong>To pass this JSON payload</strong> you can either pass it as the <strong>body</strong> of the request <strong>as string</strong> (the JSON object serialized to string),
or if you want to pass it as an object (e.g. if you want to call it from JavaScript) then you have to include a root <code>payload</code>
element, or set the JSON object as the value of the <code>payload</code> POST parameter.</p>
<p>jQuery example using the <code>payload</code> parameter:</p>
<pre><code>$.post(&quot;https://app.bitrise.io/app/APP-SLUG/build/start.json&quot;, {
    &quot;payload&quot;:{
        &quot;hook_info&quot;:{
            &quot;type&quot;:&quot;bitrise&quot;,
            &quot;api_token&quot;:&quot;APP-API-TOKEN&quot;
        },
        &quot;build_params&quot;:{
            &quot;branch&quot;:&quot;master&quot;
        }
    }
})
</code></pre>
<h2>Build Params</h2>
<p>The following parameters are supported in the <code>build_params</code> object:</p>
<h3>Git related:</h3>
<ul>
<li><code>branch</code> (string): The (Source) Branch to build. In case of a standard git commit this is the branch of the commit.
In case of a Pull Request build this is the source branch, the one the PR was started from.</li>
<li><code>tag</code> (string): The git Tag to build.</li>
<li><code>commit_hash</code> (string): The git commit hash to build.</li>
<li><code>commit_message</code> (string): The git commit message (or build's message).</li>
</ul>
<h3>Bitrise.io specific:</h3>
<ul>
<li><code>workflow_id</code>: (string): Force the use of the specified workflow ID. If not defined then the workflow will be selected
based on the project's <a href="/webhooks/trigger-map/">Trigger Map config</a>.</li>
<li><code>environments</code> (array of objects): See the <a href="#specify-environment-variables">Specify Environment Variables</a> section for more info
about the <code>environments</code> objects.</li>
<li><code>skip_git_status_report</code> (bool): Skip sending build status for the connected git provider</li>
</ul>
<h3>Pull Request specific:</h3>
<ul>
<li><code>branch_dest</code> (string): Used only in case of Pull Request builds: the destination/target branch of the Pull Request,
the one the PR will be merged <em>into</em>. Example: <code>master</code>.</li>
<li><code>pull_request_id</code> (int): Pull Request ID on the source code hosting system (e.g. the PR number on GitHub)</li>
<li><code>pull_request_repository_url</code> (string): repository url from where the Pull Request is sent. E.g. if
it's created from a fork this should be the fork's URL. Example: <code>https://github.com/xyz/bitrise.git</code>.</li>
<li><code>pull_request_merge_branch</code> (string): the pre-merge branch, <strong>if the source code hosting system supports &amp; provides</strong>
the pre-merged state of the PR on a special &quot;merge branch&quot; (ref). Probably only GitHub supports this.
Example: <code>pull/12/merge</code>.</li>
<li><code>pull_request_head_branch</code> (string): the Pull Request's &quot;head branch&quot; (<code>refs/</code>) <strong>if the source code hosting system supports &amp; provides</strong> this.
This special git <code>ref</code> should point to the <strong>source</strong> of the Pull Request. Supported by GitHub and GitLab.
Example: <code>pull/12/head</code> (github) / <code>merge-requests/12/head</code> (gitlab).</li>
</ul>
<p>!!! note &quot;Git Clone - parameter priority&quot;
If you provide a <code>tag</code>, the <code>branch</code> parameter will be ignored by the <code>Git Clone</code> step.
If you provide a <code>commit_hash</code> parameter then both the <code>tag</code> and the <code>branch</code> parameters will be ignored.
These will still be logged, will be available for steps and will be visible on the Build's details page,
but the <code>Git Clone</code> step will use the the most specific parameter for checkout.</p>
<h3>Specify Environment Variables</h3>
<p>You can define additional <em>environment variables</em> for your build.</p>
<p><em>These variables will be handled with priority between <code>Secrets</code> and <code>App Env Vars</code>,
which means that you can not overwrite environment variables defined in
your build configuration (e.g. App Env Vars), only Secrets.
For more information see:
<a href="/bitrise-cli/most-important-concepts/#availability-order-of-environment-variables">Availability order of environment variables</a></em></p>
<p>It's important that this parameter have to be an <strong>array of objects</strong>,
and that every item of the array have to include
at least a <code>mapped_to</code> (the key of the Environment Variable, without a dollar sign (<code>$</code>))
and a <code>value</code> property (the value of the variable). By default environment variable names inside values will be replaced in triggered build by actual value from target environment. This behavior can be disabled by setting <code>is_expand</code> flag to <code>false</code>.</p>
<p>Example:</p>
<pre><code>&quot;environments&quot;:[
  {&quot;mapped_to&quot;:&quot;API_TEST_ENV&quot;,&quot;value&quot;:&quot;This is the test value&quot;,&quot;is_expand&quot;:true},
  {&quot;mapped_to&quot;:&quot;HELP_ENV&quot;,&quot;value&quot;:&quot;$HOME variable contains user's home directory path&quot;,&quot;is_expand&quot;:false},
]
</code></pre>
<h3>Workflow to be used for the build</h3>
<p>By default the Workflow for your Build will be selected based on the
<code>build_params</code> and your app's <a href="/webhooks/trigger-map/">Trigger Map</a>.
This is the same as how <a href="/webhooks/">Webhooks</a> select the workflow for the build
automatically (based on the <em>Trigger Map</em>), and how you can
define separate Workflows for separate branches, tags or pull requests
without the need to specify the workflow manually for every build.</p>
<p>With the Trigger API you can however <strong>overwrite</strong> this selection
and specify exactly which Workflow you want to use.</p>
<p>All you have to do is add a <code>workflow_id</code> parameter to your <code>build_params</code>
and specify the Workflow you want to use for that specific build.</p>
<p>An example <code>build_params</code> with <code>branch</code> and <code>workflow_id</code>:</p>
<pre><code>&quot;build_params&quot;:{&quot;branch&quot;:&quot;master&quot;,&quot;workflow_id&quot;:&quot;deploy&quot;}'
</code></pre>
<h2><code>curl</code> example generator</h2>
<p>You can find an interactive cURL call configurator by clicking on the <code>Start/Schedule a build</code>
button on your app's <a href="https://www.bitrise.io">bitrise.io</a> page
and switching to <code>Advanced</code> mode in the popup.
At the bottom of the popup you can find a <code>curl</code> call, based on the parameters you specify in the popup.</p>
<p>A base curl call would look like this (with <code>master</code> specified as the <code>branch</code> build parameter):</p>
<pre><code>curl -H 'Content-Type: application/json' https://app.bitrise.io/app/APP-SLUG/build/start.json --data '{&quot;hook_info&quot;:{&quot;type&quot;:&quot;bitrise&quot;,&quot;api_token&quot;:&quot;APP-API-TOKEN&quot;},&quot;build_params&quot;:{&quot;branch&quot;:&quot;master&quot;}}'
</code></pre>
<p><em>Note: please don't forget to add <code>Content-Type</code> header with <code>application/json</code> value</em></p>
<p>A more advanced example: let's say you want to build the <strong>master</strong> <code>branch</code>
using the <code>deployment</code> workflow,
specify a build message (<code>commit_message</code>)
and set a test environment variable (<code>API_TEST_ENV</code>),
the call will look like this:</p>
<pre><code>curl  -H 'Content-Type: application/json' https://app.bitrise.io/app/APP-SLUG/build/start.json --data '{&quot;hook_info&quot;:{&quot;type&quot;:&quot;bitrise&quot;,&quot;api_token&quot;:&quot;APP-API-TOKEN&quot;},&quot;build_params&quot;:{&quot;branch&quot;:&quot;master&quot;,&quot;commit_message&quot;:&quot;Environment in API params test&quot;,&quot;workflow_id&quot;:&quot;deployment&quot;,&quot;environments&quot;:[{&quot;mapped_to&quot;:&quot;API_TEST_ENV&quot;,&quot;value&quot;:&quot;This is the test value&quot;,&quot;is_expand&quot;:true}]}}'
</code></pre>
