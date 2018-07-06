<p>Do you require a VPN connection for your build, to be able to connect to your server,
either to <code>git clone</code> your repository or to access a private API?
If yes, then this tutorial is for you!</p>
<h2>Technical infos</h2>
<p>Connecting to a VPN, in short, works like this:</p>
<ol>
<li>the build starts</li>
<li>you install &amp; configure the VPN components you need</li>
<li>you start the VPN</li>
<li>you proceed with the build</li>
</ol>
<p>Obviously, if you require a VPN connection in order to access your code repository,
you have to connect to the VPN <strong>before</strong> the <code>Git Clone</code> step, but in general
you can configure &amp; connect to the VPN anywhere in your Workflow, <strong>before</strong> you'd use the
connection.</p>
<p><em>You can choose other VPN tools, not just the one shown here (<a href="https://www.strongswan.org">strongswan</a>),
this is just one example setup which works on <a href="https://www.bitrise.io">bitrise.io</a>.</em></p>
<p><strong>One important note</strong>: when you choose your VPN tool and do the setup/configuration,
you have to be careful to <strong>not to restart / abort</strong> existing SSH sessions!
The <a href="https://www.bitrise.io">bitrise.io</a> workers will abort the build
if the SSH connection between the build's Control/Master machine and
the Build virtual machine terminates!</p>
<h2>Example</h2>
<p>This is an example script which you can either save into your repository and run
it from there, or just copy paste its content into a <code>Script Step</code> in your <code>bitrise</code>
configuration (<code>bitrise.yml</code> / Workflow).</p>
<pre><code class="language-bash">#!/usr/bin/env bash
set -e

echo &quot;WAN IP&quot;
# This prints the servers Internet IP adress to the log, useful for debugging
curl http://httpbin.org/ip

case &quot;$OSTYPE&quot; in
  linux*)
    echo &quot;Configuring for Linux&quot;

    # Variables
    etc_dir=/etc
    etc_sudo='sudo' # Sudo is needed for Linux Strongswan configuration

    # Install strongswan
    echo &quot;Installing Strongswan...&quot;
    sudo apt-get install -y strongswan

    ;;
  darwin*)
    echo &quot;Configuring for Mac OS&quot;

    # Variables
    etc_dir=/usr/local/etc
    etc_sudo='' # Sudo is NOT needed for Mac OS Strongswan configuration

    # Install Strongswan using homebrew
    echo &quot;Installing OpenSSL...&quot;
    # Manually install OpenSSL first to save time, since installing Strongswan directly compiles OpenSSL from source instead
    brew install openssl
    echo &quot;Installing Strongswan...&quot;
    brew install strongswan

    ;;
  *)
    echo &quot;Unknown operative system: $OSTYPE, exiting&quot;
    exit 1
    ;;
esac


# Method for rendering a template string file (when run, returns the input string with $VARIABLES replaced from env)
render_template() {
  eval &quot;echo \&quot;$(cat $1)\&quot;&quot;
}

# Create a temporary directory to hold files
temp_dir=/tmp/vpn-config
mkdir $temp_dir

# IPsec config file, see examples at https://wiki.strongswan.org/projects/strongswan/wiki/IKEv1Examples and https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2Examples
echo &quot;Downloading ipsec.conf...&quot;
wget https://www.example.com/ipsec.conf.template -O $temp_dir/ipsec.conf.template
# IPsec credentials file, see documentation at https://wiki.strongswan.org/projects/strongswan/wiki/IpsecSecrets
echo &quot;Downloading ipsec.secrets...&quot;
wget https://www.example.com/ipsec.secrets.template -O $temp_dir/ipsec.secrets.template
# In some cases you might need to download the certificate, or certificate chain, of your other VPN endpoint
echo &quot;Downloading server.crt...&quot;
wget https://www.example.com/server.crt -O $temp_dir/server.crt

echo &quot;Rendering config templates&quot;
render_template $temp_dir/ipsec.conf.template &gt; $temp_dir/ipsec.conf
render_template $temp_dir/ipsec.secrets.template &gt; $temp_dir/ipsec.secrets

echo &quot;Installing configuration&quot;
$etc_sudo cp $temp_dir/ipsec.conf $etc_dir/ipsec.conf
$etc_sudo cp $temp_dir/ipsec.secrets $etc_dir/ipsec.secrets
$etc_sudo cp $temp_dir/server.crt $etc_dir/ipsec.d/ocspcerts/server.crt

# Start the ipsec service
echo &quot;Starting ipsec&quot;
sudo ipsec start

# We're sleeping between commands, mostly since Mac OS seems to have some problems otherwise
sleep 1

# Output some helpful status to the log
echo &quot;Status ipsec&quot;
sudo ipsec statusall

sleep 1

# Switch out myconnection with the name of your connection in ipsec.conf
echo &quot;Initiating VPN connection&quot;
sudo ipsec up myconnection

sleep 1

case &quot;$OSTYPE&quot; in
  linux*)
    ;;
  darwin*)
    # In Mac OS El Capitan, the `sudo ipsec up` command consistently fails the first time, but succeeds after a restart of the ipsec service
    echo &quot;Restarting ipsec&quot;
    sudo ipsec restart

    sleep 1

    echo &quot;Initiating VPN connection&quot;
    sudo ipsec up myconnection

    sleep 1

    # This step might apply if you are routing all traffic trough the IPsec connection (that is, if your remote IP range is 0.0.0.0/0)
    # Mac OS El Capitan seems to have problems getting the DNS configuration from the Strongswan interface. Also IPv6 sometimes causes issues. So we're manually turning off IPv6 and forcing a new DNS configuration.
    echo &quot;Disabling IPv6 and forcing DNS settings&quot;
    # Fetch main interface
    main_interface=$(networksetup -listnetworkserviceorder | awk -F'\\) ' '/\(1\)/ {print $2}')
    # Completely disable IPv6
    sudo networksetup -setv6off &quot;$main_interface&quot;
    # Switch 10.0.0.1 with your DNS server
    sudo networksetup -setdnsservers &quot;$main_interface&quot; 10.0.0.1
    ;;
  *) ;;
esac

# Your VPN connection should be up and running. Any following steps of your Bitrise workflow can access devices over your VPN connection 🎉

</code></pre>
