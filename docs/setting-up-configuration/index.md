<p>After <a href="/adding-a-new-app/setting-up-ssh-keys">Setting up the SSH key</a> for
your project, Bitrise will download your code to make sure it can access the repository
and will run an automatic repository scanner script to find the best initial configuration for your project.
Currently Bitrise will detect <code>iOS</code>, <code>Android</code>, <code>Xamarin</code> and <code>fastlane</code> projects out of the box.</p>
<p>You can configure other types of projects too, but that will require manual
configuration.</p>
<h2>Project configuration with automatic repository scanner</h2>
<p>To validate and automatically scan your project you only need to tell Bitrise
the default branch of your repository.
During validation Bitrise will make sure it has access to the given branch,
using the <a href="/adding-a-new-app/setting-up-ssh-keys">SSH key</a> you set up.</p>
<p>After successful validation Bitrise will scan your repository and give you a default workflow</p>
<h2>Skipping the scanner - full manual configuration</h2>
<p>If for some reason you want to skip the scanner, you can choose
the <strong>Configure manually without project scanning</strong> option,
in the <strong>Validation setup</strong> section.</p>
<p><img src="/img/adding-a-new-app/validation_configure_manually.png" alt="Configure manually without project scanning"></p>
<p>By choosing this option <a href="https://www.bitrise.io/">bitrise.io</a> will only
validate the access to the repository, but it won't run the scanner.
Instead, it'll present you the manual configuration options
in the <em>Project build configuration</em> section.</p>
