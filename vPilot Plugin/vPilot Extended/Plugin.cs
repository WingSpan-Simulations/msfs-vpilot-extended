using RossCarlson.Vatsim.Vpilot.Plugins;
using RossCarlson.Vatsim.Vpilot.Plugins.Events;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vPilotExtended
{
    public class vPilotExtended: IPlugin
    {
        private Version Version = new Version(0, 1, 0);
        private Server server;
        private IBroker broker;

        public string Name => "vPilot Extended";

        public async void Initialize(IBroker broker)
        {
            this.broker = broker;
            this.server = new Server(this.broker);
            await this.server.Initialize();
            this.broker.PostDebugMessage("[vPilot Extended " + this.Version.ToString() + "] Extension loaded");

            this.broker.NetworkConnected += new EventHandler<NetworkConnectedEventArgs>(this.NetworkConnectedEvent);
            this.broker.BroadcastMessageReceived += new EventHandler<BroadcastMessageReceivedEventArgs>(this.BroadcastMessageReceivedEvent);
        }

        public void NetworkConnectedEvent(object sender, NetworkConnectedEventArgs e)
        {

        }

        public void BroadcastMessageReceivedEvent(object sender, BroadcastMessageReceivedEventArgs e)
        {

        }
    }
}
