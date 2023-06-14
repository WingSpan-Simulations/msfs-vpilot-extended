using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
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

    class Server
    {
        private IBroker broker;
        private Action<string> WebSocketMessageRecievedEvent;
        private Action WebSocketConnectionOpenedEvent;
        private WebSocketConnection connection = null;

        public Server(IBroker broker, Action<string> WebSocketMessageRecievedEvent, Action WebSocketConnectionOpenedEvent )
        {
            this.broker = broker;
            this.WebSocketMessageRecievedEvent = WebSocketMessageRecievedEvent;
            this.WebSocketConnectionOpenedEvent = WebSocketConnectionOpenedEvent;
        }

        public async Task Initialize()
        {
            var listener = new TcpListener(IPAddress.Any, 8080);
            listener.Start();
            this.broker.PostDebugMessage("Server started on port 8080");

            while (true)
            {
                var client = await listener.AcceptTcpClientAsync();
                this.connection = new WebSocketConnection(client);
                _ = HandleConnectionAsync(); // use discard operator to suppress warning
            }
        }

        async Task HandleConnectionAsync()
        {
            // Read handshake request
            var buffer = new byte[1024];
            var bytes = await this.connection.stream.ReadAsync(buffer, 0, buffer.Length);

            // Send handshake response
            var response = "HTTP/1.1 101 Switching Protocols\r\n" +
                           "Upgrade: websocket\r\n" +
                           "Connection: Upgrade\r\n" +
                           "Sec-WebSocket-Accept: " + Convert.ToBase64String(
                               System.Security.Cryptography.SHA1.Create()
                                   .ComputeHash(Encoding.UTF8.GetBytes(
                                       new System.Text.RegularExpressions.Regex("Sec-WebSocket-Key: (.*)").Match(Encoding.UTF8.GetString(buffer, 0, bytes)).Groups[1].Value.Trim() + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                                   ))
                           ) + "\r\n\r\n";
            await this.connection.SendAsync(Encoding.UTF8.GetBytes(response));

            // Read and write frames
            while (true)
            {
                bytes = await this.connection.stream.ReadAsync(buffer, 0, buffer.Length);
                if (bytes == 0) break;

                // Decode payload
                var payloadLength = (buffer[1] & 127);
                var maskingKeyIndex = 2;
                if (payloadLength == 126)
                {
                    maskingKeyIndex = 4;
                }
                else if (payloadLength == 127)
                {
                    maskingKeyIndex = 10;
                }
                var maskingKey = new byte[] { buffer[maskingKeyIndex], buffer[maskingKeyIndex + 1], buffer[maskingKeyIndex + 2], buffer[maskingKeyIndex + 3] };
                var payload = new byte[payloadLength];
                for (var i = 0; i < payloadLength; i++)
                {
                    payload[i] = (byte)(buffer[i + maskingKeyIndex + 4] ^ maskingKey[i % 4]);
                }

                // Write payload to console
                var message = Encoding.UTF8.GetString(payload);
                this.WebSocketMessageRecievedEvent(message);

                // Echo frame back
                await this.connection.SendAsync(new byte[] { 0x81, (byte)payload.Length });
                await this.connection.SendAsync(payload);
            }
        }

        public async Task SendMessage(string message)
        {
            if (this.connection != null)
            {
                var payload = Encoding.UTF8.GetBytes(message);
                await this.connection.SendAsync(new byte[] { 0x81, (byte)payload.Length });
                await this.connection.SendAsync(payload);
            }
        }
    }
}