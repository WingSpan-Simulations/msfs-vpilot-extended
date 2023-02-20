using RossCarlson.Vatsim.Vpilot.Plugins;
using RossCarlson.Vatsim.Vpilot.Plugins.Events;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*  WebSocket Message Schema
 *  
 *  INCOMING EVENTS
 *  ---------------
 *  Event/Arg1Key:Arg1Value/Arg2Key:Arg2Value/...:...
 *  
 *  Connect To Network
 *  ConnectToNetwork/Callsign:XXX/TypeCode:XXX/SelCal:XXX
 
 */

namespace vPilotExtended
{
    public class vPilotExtended: IPlugin
    {
        private Version Version = new Version(0, 1, 0);
        private Server server;
        private IBroker broker;

        public string Name => "vPilot Extended";

        public void Initialize(IBroker broker)
        {
            this.broker = broker;

            this.broker.NetworkConnected += new EventHandler<NetworkConnectedEventArgs>(this.NetworkConnectedEvent);
            this.broker.BroadcastMessageReceived += new EventHandler<BroadcastMessageReceivedEventArgs>(this.BroadcastMessageReceivedEvent);
            this.broker.PrivateMessageReceived += new EventHandler<PrivateMessageReceivedEventArgs>(this.PrivateMessageReceivedEvent);
            this.broker.RadioMessageReceived += new EventHandler<RadioMessageReceivedEventArgs>(this.RadioMessageReceivedEvent);
            this.broker.PostDebugMessage("vPE events connected");

            this.server = new Server(this.broker, this.WebSocketMessageReceivedEvent);
            _ = this.server.Initialize(); // use discard operator to suppress warning
            this.broker.PostDebugMessage("vPE server launched");
            this.broker.PostDebugMessage("vPilot Extended loaded");
        }

        public void WebSocketMessageReceivedEvent(string message)
        {
            string type = "<null>";
            Dictionary<string, string> arguments = new Dictionary<string, string>();

            string[] splitMessage = message.Split('/');
            for (int i = 0; i < splitMessage.Length; i++)
            {
                string[] splitString = splitMessage[i].Split(':');

                if (splitString.Length == 1)
                {
                    type = splitString[0].ToLower();
                } else
                {
                    arguments.Add(splitString[0].ToLower(), splitString[1]);
                }
            }

            this.broker.PostDebugMessage("[WebSocket] Event: " + type + "; Args: " + string.Join(",", arguments));

            switch (type)
            {
                case "connecttonetwork":
                    this.broker.RequestConnect(arguments["callsign"], arguments["typecode"], arguments["selcal"]);
                    break;
            };

            //this.broker.RequestConnect
        }

        public async void NetworkConnectedEvent(object sender, NetworkConnectedEventArgs e)
        {
            await this.server.SendMessage("NetworkConnectionEstablished/CallSign:" + e.Callsign +  "/TypeCode:" + e.TypeCode + "/SelCal Code:" + e.SelcalCode);
        }

        public void PrivateMessageReceivedEvent(object sender, PrivateMessageReceivedEventArgs e)
        {

        }

        public void RadioMessageReceivedEvent(object sender, RadioMessageReceivedEventArgs e)
        {

        }

        public void BroadcastMessageReceivedEvent(object sender, BroadcastMessageReceivedEventArgs e)
        {

        }
    }
}
