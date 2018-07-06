<p>If you need something you can't find a Step for, you can always install &amp; use tools with scripts or Script steps.</p>
<p>Just add a <code>Script</code> step to your Workflow, and either write your script there, or run a script from your repository.</p>
<p><em>Passwordless <code>sudo</code> is enabled on all of our build virtual machines, so you can freely use <code>sudo</code> if you need it.</em></p>
<p>Once you have a working script, <strong>you can also transform it into a Step</strong> and optionally share it with others (through our StepLib).
You can find a template and more information about how you can create your own Step at: <a href="https://github.com/bitrise-steplib/step-template">https://github.com/bitrise-steplib/step-template</a></p>
<h2>Step by step setup</h2>
<ol>
<li>Open your app on Bitrise.io</li>
<li>Open the app's Workflow Editor (on the <code>Workflow</code> tab -&gt; click <code>Manage Workflows</code>)</li>
<li>Select a Workflow</li>
<li>Click on the <code>+</code> sign (you can see this between every step), where you want to insert your Script step</li>
<li>In the step list search for &quot;script&quot;, and click the <code>Add to Workflow</code> button on the &quot;Script&quot; step item.</li>
<li>Now that you have the Script step in your workflow, you just have to select it and write your script into the <code>Script content</code> input (on the right side of the Workflow Editor).</li>
</ol>
<p><em>Note: you can drag-and-drop reorder the steps in the Workflow, so you don't have to delete and re-add a step if you'd want to change the order.</em></p>
<p>If you want to run a script from your repository you can run it from this Script step. Paths are relative to your repository's root. So, for example, if you have a Bash script at <code>path/to/script.sh</code> you can run it with this <code>Script content</code>:</p>
<pre><code>bash ./path/to/script.sh
</code></pre>
<p>Or, in a more robust form (which is better if you want to extend the content in the future):</p>
<pre><code>#!/bin/bash
set -ex
bash ./path/to/script.sh
</code></pre>
<p><em>The <code>set -ex</code> line is recommended for every multi-line Bash script, to make your scripts easier to debug.</em></p>
<p>You can of course run non Bash scripts too, e.g. a Ruby script:</p>
<pre><code>#!/bin/bash
set -ex
ruby ./path/to/script.rb
</code></pre>
<h3>Examples</h3>
<p>At this point you already have the Script step in your Workflow, and you just have to write the
script to install the dependency. How do you do that? Exactly the same way you would on
your own Mac / Linux, in your Terminal / Command Line!</p>
<h4><code>brew</code> on macOS</h4>
<p>E.g. to install <code>cmake</code> with a script step, on macOS, using <code>brew</code>:</p>
<pre><code>#!/bin/bash
set -ex
brew install cmake
</code></pre>
<p>Actually, the whole Script content could be as short as:</p>
<pre><code>brew install cmake
</code></pre>
<p>Which is exactly how you would use <code>brew</code> on your Mac, but you'll most likely
add more content to the Script step sooner or later; the first
example is a more future proof Bash script template.</p>
<h4><code>apt-get</code> on Linux</h4>
<p>E.g. to install <code>cmake</code> with a script step, on Linux, using <code>apt-get</code>:</p>
<pre><code>#!/bin/bash
set -ex
sudo apt-get install -y cmake
</code></pre>
<p>!!! note &quot;Don't forget the <code>-y</code> flag for <code>apt-get</code>!&quot;
If you don't add the <code>-y</code> (&quot;yes&quot;) flag to the <code>apt-get</code> command, <code>apt-get</code> will
present a prompt which you have to accept or deny <strong>manually</strong>.
This is not a problem on your own Linux machine, but in a CI environment
you can't provide manual input for <code>apt-get</code>. To prevent this issue,
and to auto accept the prompt, just use the <code>-y</code> flag, as shown in the example.</p>
<h2>Advanced option: use <code>deps</code> in <code>bitrise.yml</code></h2>
<p>Instead of installing your tool inside the Script step, you can use the <code>deps</code> option
of the <code>bitrise.yml</code>. If you declare <code>deps</code> <em>for a given Step</em>,
the <a href="https://github.com/bitrise-io/bitrise">Bitrise CLI</a>
will check if that tool is installed, and will install it for you if required.</p>
<p>!!! note &quot;Available dependency managers&quot;
This method is the preferred way of handling (step) dependencies, as the Bitrise CLI
will not (re)install the specified tool(s) if it's already available.
That said, there are tools which are not available in the supported dependency managers,
or you need a version of the tool which is not available in the dependency manager.
In those cases you should simply install the tool inside the Script, as described above.</p>
<p>An example, installing <code>cmake</code> with either <code>apt-get</code> (where <code>apt-get</code> is available),
or with <code>brew</code> (on macOS):</p>
<pre><code>deps:
  brew:
  - name: cmake
  apt_get:
  - name: cmake
</code></pre>
<p>A minimal <code>bitrise.yml</code> for demonstration:</p>
<pre><code>format_version: 1.2.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
        deps:
          brew:
          - name: cmake
          apt_get:
          - name: cmake
        inputs:
          - content: |-
              #!/bin/bash
              set -ex
              which cmake
</code></pre>
<p>An advanced tip: if you want to declare a dependency which might be available from
another source (not through the package manager), then you might also want to declare the
related <code>binary name</code>. If that matches the package name (like in case of <code>cmake</code>) this is
completely optional, but in case the package does not match the binary name you can
declare it with <code>bin_name</code>. An example is AWS CLI, where the package name in both
package managers is <code>awscli</code>, but the binary itself is <code>aws</code>.</p>
<p>A minimal <code>bitrise.yml</code> for demonstration:</p>
<pre><code>format_version: 1.3.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
        deps:
          brew:
          - name: awscli
            bin_name: aws
          apt_get:
          - name: awscli
            bin_name: aws
        inputs:
          - content: |-
              #!/bin/bash
              set -ex
              which aws
</code></pre>
<h2>Conditional execution</h2>
<p>Additionally, you can use Environment Variables in your scripts too.
As an example, using the <code>PR</code> environment variable
(but you can use any <a href="/faq/available-environment-variables/">Available Environment Variable</a>,
like the ones exposed by previous steps in the Workflow),
to run different scripts in case of a Pull Request and a non Pull Request build:</p>
<pre><code>#!/bin/bash
set -ex

if [[ &quot;$PR&quot; == &quot;true&quot; ]] ; then
  echo &quot;=&gt; Pull Request mode/build!&quot;
  bash ./path/to/in-case-of-pull-request.sh
else
  echo &quot;=&gt; Not Pull Request mode/build!&quot;
  bash ./path/to/not-pull-request.sh
fi
</code></pre>
<p><em>Note: if you <strong>don't</strong> want to run any part of the Step/script based on a variable (like <code>$PR</code>),
you don't have to implement the check in the script. You can use the <code>run_if</code> expression in
the <code>bitrise.yml</code> directly to declare in which case(s) the Step should run. Additionally,
<code>run_if</code> can be added to any step, not just to Script steps.
You can find more information about <code>run_if</code> expressions
in <a href="/tips-and-tricks/disable-a-step-by-condition/#run-a-step-only-if-the-build-failed">this guide</a>.</em></p>
