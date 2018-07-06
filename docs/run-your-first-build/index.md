<p>To run your Bitrise build you only need two things:</p>
<ol>
<li>The Bitrise CLI - <a href="/bitrise-cli/installation/">installation guide</a></li>
<li>A build configuration (<code>bitrise.yml</code>)</li>
</ol>
<p>Once you have the Bitrise CLI installed (just run <code>bitrise setup</code> to validate
the installation) you just have to create the <code>bitrise.yml</code> build configuration,
and you're ready to go!</p>
<p>If you use <a href="https://www.bitrise.io">bitrise.io</a>, you can download your app's <code>bitrise.yml</code> right from
<a href="https://www.bitrise.io">bitrise.io</a>, and run the build locally. The <code>bitrise.yml</code> can be found
in the Workflow Editor of the app on <a href="https://www.bitrise.io">bitrise.io</a>, under the <code>bitrise.yml</code> section.</p>
<p>If you want to create a <code>bitrise.yml</code> yourself, simply create a <code>bitrise.yml</code> file
in the root of your project. You can use this as the base content of <code>bitrise.yml</code>:</p>
<pre><code class="language-yaml">format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

app:
  envs:
  - MY_NAME: My Name

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: echo &quot;Hello ${MY_NAME}!&quot;
</code></pre>
<p>To run this build open your Terminal / Command Line, <code>cd</code> into the directory where
you saved the <code>bitrise.yml</code>, and run: <code>bitrise run test</code>.</p>
<p>That's all, you just ran your first build with the Bitrise CLI!</p>
<p>Read on to learn more about how the Bitrise CLI and the <code>bitrise.yml</code> configuration works,
you'll be able to compose and run complex builds in no time!</p>
