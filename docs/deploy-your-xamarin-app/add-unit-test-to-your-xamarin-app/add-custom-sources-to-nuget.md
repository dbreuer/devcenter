<p>If you are using third-party NuGet packages in your application
you have to add these sources to your NuGet package sources.</p>
<p>Simply add a new <code>Script</code> step to your workflow with the following bash script as the content:</p>
<pre><code>#!/bin/bash
set -ex

nuget sources add -Name NAME_FOR_SOURCE -Source SOURCE_URL
</code></pre>
<p>!!! warning
Don't forget to update the <code>NAME_FOR_SOURCE</code> and <code>SOURCE_URL</code> parameters,
and make sure to place the <code>Script</code> step before the <code>NuGet Restore Step</code>.</p>
<h3>Custom NuGet source with credentials</h3>
<p>If you need to set credentials for your NuGet source you can modify the <code>Script</code> above in the following way:</p>
<pre><code>#!/bin/bash
set -ex

nuget sources add -Name NAME_FOR_SOURCE -Source SOURCE_URL -UserName NUGET_USERNAME -Password NUGET_PASSWORD
</code></pre>
