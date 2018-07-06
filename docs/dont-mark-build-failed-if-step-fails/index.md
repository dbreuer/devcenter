<p><em>To do this you have to switch to <code>bitrise.yml</code> mode (open the Workflow Editor on bitrise.io -&gt; left side: click on <code>bitrise.yml</code> to switch to the interactive <code>bitrise.yml</code> editor).</em></p>
<p>All you have to do is: add an <code>is_skippable: true</code> flag to the Step.</p>
<p>An example <code>script</code> step which, although fails, it won't &quot;break&quot; the build:</p>
<pre><code>- script:
    is_skippable: true
    inputs:
    - content: |-
        #!/bin/bash
        echo &quot;Failing Step.&quot;
        exit 1
        # exit 1 would mark this step as Failed, but it won't break the Build
        #  because of the is_skippable: true flag / property
</code></pre>
<p>You can find more examples on <a href="https://github.com/bitrise-io/bitrise/blob/fec3772ee2287d6e405d908fb9b42367a5751b43/_examples/tutorials/errors-force-run-and-skippable/bitrise.yml">GitHub</a>.</p>
