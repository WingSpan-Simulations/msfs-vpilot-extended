using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using RossCarlson.Vatsim.Vpilot.Plugins;

namespace vPilotExtended {
    class WebSocketConnection
    {
        public readonly NetworkStream stream;

        public WebSocketConnection(TcpClient client)
        {
            stream = client.GetStream();
        }

        public async Task SendAsync(byte[] data)
        {
            await stream.WriteAsync(data, 0, data.Length);
        }
    }

    class NewServer
    {
        private IBroker broker;
        private Action<string> WebSocketMessageRecievedEvent;
        private Action WebSocketConnectionOpenedEvent;
        private List<WebSocket> connectedSockets = new List<WebSocket>();

        public NewServer(IBroker broker, Action<string> WebSocketMessageRecievedEvent, Action WebSocketConnectionOpenedEvent)
        {
            this.broker = broker;
            this.WebSocketMessageRecievedEvent = WebSocketMessageRecievedEvent;
            this.WebSocketConnectionOpenedEvent = WebSocketConnectionOpenedEvent;
        }

        public async Task Initialize()
        {
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add("http://127.0.0.1:8080/");
            listener.Start();


            while (true)
            {
                HttpListenerContext context = await listener.GetContextAsync();
                if (context.Request.IsWebSocketRequest)
                {
                    ProcessWebSocketRequest(context);
                }
            }
        }

        public async void ProcessWebSocketRequest(HttpListenerContext context)
        {
            HttpListenerWebSocketContext webSocketContext = await context.AcceptWebSocketAsync(null);
            WebSocket webSocket = webSocketContext.WebSocket;
            connectedSockets.Add(webSocket);

            // Handle WebSocket communication here
            this.WebSocketConnectionOpenedEvent();
            await HandleWebSocket(webSocket);
        }

        private async Task HandleWebSocket(WebSocket webSocket)
        {
            byte[] buffer = new byte[1024];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                // Process received data or send data to the client
                string receivedMessage = Encoding.UTF8.GetString(buffer, 0, result.Count);
                this.WebSocketMessageRecievedEvent(receivedMessage);

                // Continue listening for the next message
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }

        public async Task SendMessage(string message)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(message);

            // Send the message to all connected WebSocket clients
            foreach (var webSocket in connectedSockets)
            {
                await webSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}