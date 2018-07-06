<p>To add support for your <a href="http://fsharp.github.io/FAKE/">FAKE</a> build scripts,
open your app's <a href="/getting-started/manage-your-bitrise-workflow/">Workflow Editor on bitrise.io</a>
and add a <code>Script</code> step to your workflow.</p>
<p>Below you can find an example script content to perform a build with FAKE,
<em>make sure you fill out the parameters at the top of the script</em>!</p>
<pre><code class="language-bash">#!/bin/bash
set -ex

# Fill out these parameters:
# You should use the same directory that you set in your build script for the FAKE dll
output_directory=tools
fake_build_script=build.fsx
fake_target_name=
fake_option_flags=

# ---

fake_exe=&quot;${output_directory}/FAKE/tools/fake.exe&quot;

if [ ! -f &quot;${fake_exe}&quot; ]; then
  printf &quot;\e[34mInstalling FAKE\e[0m\n&quot;
  nuget install FAKE -OutputDirectory &quot;${output_directory}&quot; -ExcludeVersion -NoCache -NonInteractive
fi

command=(&quot;mono&quot; &quot;${fake_exe}&quot;)

if [ -n &quot;$fake_build_script&quot; ] ; then
  command+=(&quot;${fake_build_script}&quot;)
fi

if [ -n &quot;$fake_target_name&quot; ] ; then
  command+=(&quot;${fake_target_name}&quot;)
fi

if [ -n &quot;$fake_option_flags&quot; ] ; then
  command+=(&quot;${fake_option_flags}&quot;)
fi

printf &quot;\e[34mExecuting ${fake_build_script}\e[0m\n&quot;
$(IFS=' '; echo &quot;${command[*]}&quot;)
</code></pre>
<p>You should update the <code>output_directory</code> and <code>fake_build_script</code> variables for your needs and you are ready to go!</p>
<p>!!! note
You should set the <code>output_directory</code> to the same directory where your build script will search for the FAKE dlls.</p>
