<p>With the App Status (/ Badge) API you can get an embeddable SVG badge image,
or a JSON message, reflecting the status of the app, or a specific branch of the app.</p>
<p>The easiest way to configure a Badge image is to open your App on <a href="https://www.bitrise.io">bitrise.io</a>
and click the badge image, right next to the app's name.</p>
<p>This will open a popup where you can optinally set a branch, and get copy-paste ready embed
codes for the SVG badge image.</p>
<p>Example SVG URL:</p>
<pre><code>https://www.bitrise.io/app/APP-ID/status.svg?token=APP-STATUS-BADGE-TOKEN&amp;branch=master
</code></pre>
<p>To get the JSON equivalent of the status badge simply replace <code>.svg</code> in the embed
URL with <code>.json</code>.</p>
<p>Example JSON URL:</p>
<pre><code>https://www.bitrise.io/app/APP-ID/status.json?token=APP-STATUS-BADGE-TOKEN&amp;branch=master
</code></pre>
<p><em>Note: the <code>APP-STATUS-BADGE-TOKEN</code> is a special token which can only be used
for calling this endpoint (you can find this token in the Badge configurator popup).
<strong>No other information can be retrieved with this token</strong>,
and it's not the same as the API Token which you can find on the <code>Code</code> tab!</em></p>
<h2>JSON response</h2>
<p>The JSON response returns a very simple JSON object:</p>
<pre><code>{
    &quot;status&quot;: &quot;SIMPLIFIED-STATUS-AS-TEXT&quot;
}
</code></pre>
<p>Where <code>SIMPLIFIED-STATUS-AS-TEXT</code> can be:</p>
<ul>
<li><code>success</code> : if the last finished build on the specified branch was successful</li>
<li><code>error</code> : if the last finished build failed or was aborted on the specified branch</li>
<li><code>unknown</code> : in any other case, including if there was no (finished) build on the specified branch</li>
</ul>
<h3>HTTP Codes and Errors</h3>
<p>If the <code>APP-ID</code> and the <code>APP-STATUS-BADGE-TOKEN</code> parameters are correct,
and identify an existing app, a <strong>200</strong> HTTP code is returned alongside the JSON response,
even if the branch parameter points to a non existing branch (the JSON
response in this case will be <code>{&quot;status&quot;: &quot;unknown&quot;}</code> with a 200 HTTP code).</p>
<p>If the <code>APP-ID</code> or the <code>APP-STATUS-BADGE-TOKEN</code> (or both) is not correct,
you'll get a HTTP <strong>403</strong> code <em>with an empty response</em> body.</p>
