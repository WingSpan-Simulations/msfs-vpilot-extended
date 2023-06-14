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
 *  ConnectToNetwork/Callsign:XXX/TypeCode:XXX/SelCal:XXX
 *  DisconnectFromNetwork
 *  
 *  SendFlightPlan/Argument:Value
 *  FileFlightPlan
 *  
 *  Flight Plan Arguments = Departure:ICAO/Arrival:ICAO/Alternate:ICAO/CruiseAlt:#####/CruiseSpeed:####/Route:XXXX/Remarks:XXXX/DepartureTime:####/HoursEnroute:##/MinsEnroute:##/HoursFuel:##/MinsFuel:##/IsVFR:[true/false]
 *
 */



namespace vPilotExtended
{
    public class FlightPlan
    {
        public string departure = "";
        public string arrival = "";
        public string alternate = "";
        public int cruisealt = 0;
        public int cruisespeed = 0;
        public string route = "";
        public string remarks = "";
        public string equipmentCode = "";
        public int departuretime = 0000;
        public int hoursenroute = 0;
        public int minsenroute = 0;
        public int hoursfuel = 0;
        public int minsfuel = 0;
        public bool vfr = false;
        public bool heavyaircraft = false;
    }

    public class vPilotExtended: IPlugin
    {
        private Version Version = new Version(0, 1, 0);
        private Server server;
        private IBroker broker;

        public FlightPlan flightPlan = new FlightPlan(); 
        public string callsign = null;
        public string typecode = null;
        public string selcal = null;

        public string Name => "vPilot Extended";

        private string[] HeavyAircraft = {"A225", "SLCH", "A388", "B748", "BLCF", "B744", "B743", "B742", "B741", "B74S", "B74R", "A124", "C5M", "A346", "A345", "A343", "A342", "B77W", "B77L", "B773", "B772", "MD11", "A359", "IL96", "DC10", "B78X", "B789", "B788", "A339", "A338", "A337", "A333", "A332", "L101", "IL86", "B764", "B763", "A306", "A310", "A400", "CONC", "VC10", "B703", "DC86", "DC83"   };

        public void Initialize(IBroker broker)
        {
            this.broker = broker;

            this.broker.NetworkConnected += new EventHandler<NetworkConnectedEventArgs>(this.NetworkConnectedEvent);
            this.broker.NetworkDisconnected += new EventHandler(this.NetworkDisconnectedEvent);
            this.broker.BroadcastMessageReceived += new EventHandler<BroadcastMessageReceivedEventArgs>(this.BroadcastMessageReceivedEvent);
            this.broker.PrivateMessageReceived += new EventHandler<PrivateMessageReceivedEventArgs>(this.PrivateMessageReceivedEvent);
            this.broker.RadioMessageReceived += new EventHandler<RadioMessageReceivedEventArgs>(this.RadioMessageReceivedEvent);
            this.broker.PostDebugMessage("vPE events connected");

            this.server = new Server(this.broker, this.WebSocketMessageReceivedEvent, this.WebSocketConnectionOpenedEvent);
            _ = this.server.Initialize(); // use discard operator to suppress warning
            this.broker.PostDebugMessage("vPE server launched");
            this.broker.PostDebugMessage("vPilot Extended loaded");
        }

        public async void WebSocketConnectionOpenedEvent()
        {
            if (this.callsign != null)
            {
                await this.server.SendMessage("NetworkConnectionEstablished/CallSign:" + this.callsign + "/TypeCode:" + this.typecode + "/SelCal:" + this.selcal);
            }
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

            this.broker.PostDebugMessage(message);
            this.broker.PostDebugMessage("[WebSocket] Event: " + type + "; Args: " + string.Join(",", arguments));

            this.broker.PostDebugMessage(type);

            switch (type)
            {
                case "connecttonetwork":
                    this.broker.RequestConnect(arguments["callsign"], arguments["typecode"], arguments["selcal"]);
                    break;
                //case "fetchflightplan":
                //    string a = this.broker.RequestFlightPlan() ? "NULL";
                //    break;
                case "sendflightplan":

                     foreach (KeyValuePair<string, string> argument in arguments)
                    {
                        switch (argument.Key)
                        {
                            case "departure":
                                this.flightPlan.departure = argument.Value;
                                break;
                            case "arrival":
                                this.flightPlan.arrival = argument.Value;
                                break;
                            case "alternate":
                                this.flightPlan.alternate = argument.Value;
                                break;
                            case "cruisealt":
                                this.flightPlan.cruisealt = int.Parse(argument.Value); 
                                break;
                            case "cruisespeed":
                                this.flightPlan.cruisespeed = int.Parse(argument.Value);
                                break;
                            case "route":
                                this.flightPlan.route = argument.Value;
                                break;
                            case "remarks":
                                this.flightPlan.remarks = argument.Value;
                                break;
                            case "departuretime":
                                this.flightPlan.departuretime = int.Parse(argument.Value);
                                break;
                            case "hoursenroute":
                                this.flightPlan.hoursenroute = int.Parse(argument.Value);
                                break;
                            case "minsenroute":
                                this.flightPlan.minsenroute = int.Parse(argument.Value);
                                break;
                            case "hoursfuel":
                                this.flightPlan.hoursfuel= int.Parse(argument.Value);
                                break;
                            case "minsfuel":
                                this.flightPlan.minsfuel = int.Parse(argument.Value);
                                break;
                            case "equipmentcode":
                                this.flightPlan.equipmentCode = argument.Value;
                                break;
                            case "isvfr":
                                this.flightPlan.vfr = bool.Parse(argument.Value);
                                break;
                        }
                        this.broker.PostDebugMessage("Argument:" + argument.Key + " , " + argument.Value);
                    }
                    break;
                case "fileflightplan":
                    this.broker.PostDebugMessage("FLIGHT PLAN FILED");
                    this.broker.FileFlightPlan(this.flightPlan.departure, this.flightPlan.arrival, this.flightPlan.alternate, this.flightPlan.cruisealt, this.flightPlan.cruisespeed, this.flightPlan.route, this.flightPlan.remarks, this.flightPlan.heavyaircraft, this.flightPlan.equipmentCode, this.flightPlan.departuretime, this.flightPlan.hoursenroute, this.flightPlan.minsenroute, this.flightPlan.hoursfuel, this.flightPlan.minsfuel, this.flightPlan.vfr);
                    break;
                case "disconnectfromnetwork":
                    this.broker.RequestDisconnect();
                    break;
            };
        }

        public async void NetworkConnectedEvent(object sender, NetworkConnectedEventArgs e)
        {
            this.callsign = e.Callsign;
            this.typecode = e.TypeCode;
            this.selcal = e.SelcalCode;
            this.flightPlan.heavyaircraft = HeavyAircraft.Contains(e.TypeCode);
            await this.server.SendMessage("NetworkConnectionEstablished/CallSign:" + e.Callsign +  "/TypeCode:" + e.TypeCode + "/SelCal:" + e.SelcalCode);
        }
        public async void NetworkDisconnectedEvent(object sender, EventArgs e)
        {
            this.callsign = null;
            this.typecode = null;
            this.selcal = null;
            await this.server.SendMessage("DisconnectedFromNetwork");
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
