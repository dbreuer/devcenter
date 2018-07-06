<p>You can do this in quite a few ways, these are probably the easiest ones:</p>
<ul>
<li>use the <code>ZIP resource archive downloader</code> step for downloading and extracting a ZIP file</li>
<li>use the <code>File Downloader</code> step to download a single file</li>
<li>use a <code>Script</code> Step</li>
</ul>
<p>!!! note &quot;Store the resources file on <a href="https://www.bitrise.io">bitrise.io</a>&quot;
You can store the resources file on <a href="https://www.bitrise.io">bitrise.io</a>.
In the Workflow Editor select the &quot;Code signing &amp; Files&quot; section,
and upload the archive file in the &quot;Generic File Storage&quot; section.
Bitrise will automatically generate a (time limited, expiring) download URL
for the files you upload here, and will expose the download URL
as an Environment Variable.</p>
<h2>Using the <code>ZIP resource archive downloader</code> step</h2>
<p>If you have your resources on your server in a zip archive, all you have to do
is to add the <code>ZIP resource archive downloader</code> Step to your Workflow,
specify the URL of the ZIP and the destination where the zip's content should be uncompressed.</p>
<p>The <em>source code of your app</em> will be (by default) downloaded into the folder
defined in the <code>$BITRISE_SOURCE_DIR</code> environment variable.</p>
<p>If you want to place the content of your ZIP archive into a folder called <em>myresource</em>
inside your app's source code directory, you can define the extract target folder
(of the <code>ZIP resource archive downloader</code> step) as <code>${BITRISE_SOURCE_DIR}/myresource</code>,
or <code>./myresource</code> (as the default working directory is the source code directory).</p>
<h2>Single file - using the <code>File Downloader</code> step</h2>
<p>If you only want to download a single file, you can of course ZIP it up and
use the <code>ZIP resource archive downloader</code> step as described in the previous section,
but there's also a step for single file downloads.</p>
<p>The <code>File Downloader</code> step can be used for this use case. Works very similarly as the
<code>ZIP resource archive downloader</code> step, except it does not require a ZIP file,
it simply downloads the specified file to the location you set.</p>
<pre><code>...
- file-downloader:
    inputs:
    - source: $BITRISEIO_my_file_id_URL
    - destination: &quot;$BITRISE_SOURCE_DIR/path/to/store/the/file&quot;
...
</code></pre>
<h2>The &quot;manual&quot; way</h2>
<p>If you want to control the whole download process, you can use the <code>Script</code> step
and write your own download code, something like this:</p>
<pre><code>#!/bin/bash
set -ex
# Download your resource
curl -fo &quot;download/path&quot; &quot;https://url/of/your/resource&quot;
# Uncompress it
unzip -u &quot;download/path&quot; -d &quot;uncompress/target/path&quot;
</code></pre>
<p><em>If you'd need an additional tool to download or uncompress the resources file,
please see the <a href="/tips-and-tricks/install-additional-tools/">Install Any Additional Tool</a> guide.</em></p>
