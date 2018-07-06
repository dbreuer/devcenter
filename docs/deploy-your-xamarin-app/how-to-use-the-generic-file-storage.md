<h2>How to upload files to bitrise's <em>Generic File Storage</em>?</h2>
<ul>
<li>Open your app on <a href="https://www.bitrise.io">bitrise.io</a></li>
<li>Go to <code>Workflow</code> tab, to open the <code>Workflow Editor</code></li>
<li>On the left side of <code>Workflow Editor</code> select <code>Code signing &amp; Files</code></li>
<li>Scroll down to <code>Generic File Storage</code> section and click on <code>+ Add another File</code></li>
<li>Enter your uniqe id and select your file you want to upload</li>
</ul>
<p>!!! note
Bitrise will upload your file and assign an environment variable (<code>BITRISEIO_[the ID you specify]_URL</code>)
to the file's download url. A <strong>time limited, read only download URL</strong> will
be set as the value of this Environment Variable
for every build. You can use this URL to download the file during a build._</p>
<h2>How to use files uploaded to Bitrise's <em>Generic File Storage</em>?</h2>
<p>You can refer the file's read-only download url with the environment variable (<code>BITRISEIO_[the ID you specify]_URL</code>) you defined at upload.</p>
<p>Some steps have built-in support for downloading the file from a specified URL.
These steps can use <code>BITRISEIO_[the ID you specify]_URL</code> as input value directly.
<em>Example: the <code>certificate-and-profile-installer</code> step's <code>certificate_url</code>
<a href="https://github.com/bitrise-io/steps-certificate-and-profile-installer/blob/master/step.yml#L24">input</a>.</em></p>
<p>Other steps might require local file paths, and don't support URLs directly as the input value.
If that's the case you can use the <code>File Downloader</code> or
the generic <code>Script</code> step to download your file, and (optionally) export the downloaded file's path as an environment variable.</p>
<h3>Example to download a file using the <code>File Downloader</code> step</h3>
<p>Assuming the file's Generic File Storage url is assigned to <code>BITRISEIO_MY_FILE_ID_URL</code>, the script step would look like:</p>
<pre><code>...
- file-downloader:
    inputs:
    - source: &quot;$BITRISEIO_MY_FILE_ID_URL&quot;
    - destination: &quot;$BITRISE_SOURCE_DIR/path/to/store/the/file&quot;
...
</code></pre>
<p>You can set the location as an <code>App Env Var</code> instead of specifying it
directly for the <code>destination</code> input. That way you can refer the file
through the environment variable in other steps, you won't have to
specify the path every time.</p>
<p>For example, if you specify the <code>BITRISEIO_MY_FILE_LOCAL_PATH</code> as an <code>App Env Var</code>,
you can use it as the download destination like:</p>
<pre><code>...
- file-downloader:
    inputs:
    - source: &quot;$BITRISEIO_MY_FILE_ID_URL&quot;
    - destination: &quot;$BITRISEIO_MY_FILE_LOCAL_PATH&quot;
...
</code></pre>
<p>And then in subsequent steps you can use the same <code>$BITRISEIO_MY_FILE_LOCAL_PATH</code> env var
as the file path.</p>
<h3>Example to download a file and export the file's path, using a <code>Script</code> step</h3>
<p>Assuming the file's Generic File Storage url is assigned to <code>BITRISEIO_MY_FILE_ID_URL</code>, the script step would look like:</p>
<pre><code>- script:
    inputs:
    - content: |
        #!/bin/bash
        set -ex

        # specify local download path
        file_local_path=download/path/to/my/file

        # download the file
        wget -O &quot;$file_local_path&quot; &quot;$BITRISEIO_MY_FILE_ID_URL&quot;
        echo &quot;file downloaded to: $file_local_path&quot;

        # OPTIONALLY: export the file's local path, to be able to use it in subsequent steps as an input value
        envman add --key BITRISEIO_MY_FILE_LOCAL_PATH --value &quot;$file_local_path&quot;
</code></pre>
<p><em>In subsequent steps you can refer the downloaded file's path with <code>$BITRISEIO_MY_FILE_LOCAL_PATH</code>.
Alternatively you can set the location as an <code>App Env Var</code> for example, and
simply download it to that path instead of defining the path
inside the Script.</em></p>
