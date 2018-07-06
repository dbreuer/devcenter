<p>During the development of your iOS app you will need at least two types of distribution. One for internal testing and deployment for your QA team, and one for deploying your app to the App Store.</p>
<p>To achieve this, <a href="/ios/uploading-certificates/">first you have to upload multiple certificates</a> ( development and distribution ) and the associated provisioning profiles. When it's all set up you can create multiple workflows for your app on Bitrise:</p>
<p>##How it was before</p>
<p>Let's say you setup two workflows, one with a <code>master</code> trigger to kick of your <code>AppStore</code> workflow. This will sign your apps with the distribution profile and a trigger with <code>*</code> to kick of your normal <code>Primary</code> workflow that builds and deploys your app to the testers. On both workflows you can setup an <code>Xcode Archive step</code>, update the needed signing and you are ready to go.</p>
<p>This will create the required IPA's for you, but there is an easier way!</p>
<p>##Setting up automatic resigning</p>
<p>Instead of running multiple <code>Xcode Archive steps</code>, setup your project to sign your apps with <strong>Automatic &gt; iOS Developer</strong> and upload a <strong>wildcard provisioning profile</strong>. ( You can even use our own preinstalled certificate and provisioning profile for that if you don't set the team id. )</p>
<p><img src="/img/ios/ios_developer_automatic.png" alt="iOS Developer"></p>
<p>When you want to deploy your app to the QA team or to App Store, add the <code>iOS Re-sign step</code> to your workflow and set your iTunes team ID with the required distribution. It will simply re-sign your IPA and your are ready to go, without the need of manually handling different versions of settings in your project, or burning build minutes.</p>
<p>Here you can find a sample bitrise.yml that will resign your app and deploy it to iTunes Connect if you are deploying to the <code>master branch</code></p>
<pre><code class="language-yaml">---
format_version: 1.2.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- pattern: &quot;master&quot;
  is_pull_request_allowed: false
  workflow: appstore
- pattern: &quot;*&quot;
  is_pull_request_allowed: true
  workflow: primary
app:
  envs:
  - BITRISE_PROJECT_PATH: $BITRISE_PROJECT_PATH
  - BITRISE_SCHEME: $BITRISE_SCHEME
  - INFO_PLIST_PATH: $INFO_PLIST_PATH
  - ITUNES_CONNECT_USER: $ITUNES_CONNECT_USER           # Store it in .bitrise.secrets.yml
  - ITUNES_CONNECT_PASSWORD: $ITUNES_CONNECT_PASSWORD   # Store it in .bitrise.secrets.yml
  - ITUNES_CONNECT_TEAM_ID: $ITUNES_CONNECT_TEAM_ID     # Store it in .bitrise.secrets.yml
  - ITUNES_CONNECT_APP_ID: $ITUNES_CONNECT_APP_ID       # Store it in .bitrise.secrets.yml
workflows:
  primary:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv &quot;SSH_RSA_PRIVATE_KEY&quot; | ne &quot;&quot;}}'
    - git-clone@3.3.2: {}
    - certificate-and-profile-installer@1.6.0: {}
    - set-xcode-build-number@1.0.4:
        inputs:
        - plist_path: $INFO_PLIST_PATH
    - xcode-archive@1.8.5: {}
    - deploy-to-bitrise-io@1.2.4: {}

  appstore:
    before_run:
    - primary
    steps:
    - resign-ipa@1.0.0:
        inputs:
        - distribution_type: AppStore
        - itunes_connect_team_id: $ITUNES_CONNECT_TEAM_ID
    - deploy-to-itunesconnect-deliver@2.6.1:
        inputs:
        - ipa_path: $BITRISE_RESIGNED_IPA_PATH
        - itunescon_user: $ITUNES_CONNECT_USER
        - password: $ITUNES_CONNECT_PASSWORD
        - app_id: $ITUNES_CONNECT_APP_ID
</code></pre>
