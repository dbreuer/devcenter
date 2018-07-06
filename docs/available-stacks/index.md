<p>The Stack indicates the virtual machine version that we will use to run your build.
After adding your application to Bitrise we will select an appropriate Stack for it,
but you can simply change it to a different one on the <code>Settings</code> tab of your app.</p>
<p><img src="/img/infrastructure/stack_selector.png" alt="Screenshot"></p>
<p>After selecting the Stack you want to use you'll see a short description of the stack
with an additional link to learn more about that specific Stack (e.g. to see what
tools are preinstalled, and which versions, on the selected Stack).</p>
<p>!!! note &quot;The Stack won't be used until you click the <code>Save</code> button!&quot;</p>
<h2>Stack status types</h2>
<table>
<thead>
<tr>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Stable</td>
<td>Generally available and expected to be supported for the foreseeable future. <strong>Updated when an update for the Stack's primary tool is available.</strong> Example: when Xcode 7.3.1 was released, the Xcode 7.3 stack was updated to have 7.3.1 instead of 7.3(.0). In case of <code>Xamarin</code> stacks, the Xamarin updates are applied weekly, during the weekends.</td>
</tr>
<tr>
<td>LTS (Long Term Support)</td>
<td>No changes (updates) will be made to the stack, except for absolutely crucial changes (for example which affect security), and Bitrise CLI tool updates. Preinstalled tool versions will remain the same, until the Stack is removed from our collection.</td>
</tr>
</tbody>
</table>
<h2>Stack prepare types</h2>
<table>
<thead>
<tr>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Pre-Booted</td>
<td>If a Stack is available as pre-booted, and there's enough pre-booted machines with that Stack configuration, your build can start right away, without waiting for the build environment to boot. In case there's no more available pre-booted machine with that Stack configuration, your build will start on an <code>On-Demand</code> configuration.</td>
</tr>
<tr>
<td>On-Demand</td>
<td>If a Stack is available as on-demand configuration and there's no (available) pre-booted configuration for the Stack, our system will have to create a virtual machine for your selected configuration <strong>when your build starts</strong>. This means that your build will be in <code>preparing environment</code> state while the related Virtual Machine is created &amp; booted. For a macOS configuration the boot process usually takes about 1 - 1.5 minutes. <em>The prepare time (of course) is not counted into the build time, it won't affect how long your build can run.</em></td>
</tr>
</tbody>
</table>
<h2>What's preinstalled</h2>
<p>Every time we create or update a Stack we create a &quot;System Report&quot; for it too.
The System Reports include the list of preinstalled tools and their version on the stack.
The System Report scripts are also open source, so if you want to run it yourself
or you want to add another tool / system check, feel free to send us a pull request!</p>
<p>You can find every available stack's System Report on GitHub: <a href="https://github.com/bitrise-io/bitrise.io/tree/master/system_reports">https://github.com/bitrise-io/bitrise.io/tree/master/system_reports</a></p>
