using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using RossCarlson.Vatsim.Vpilot.Plugins;

namespace vPilotExtended { 
    class Server
    {
        public IBroker broker;

        public Server(IBroker broker)
        {
            this.broker = broker;
        }

        public async Task Initialize()
        {
            var listener = new TcpListener(IPAddress.Any, 8080);
            listener.Start();
            this.broker.PostDebugMessage("Server started on port 8080");

            while (true)
            {
                var client = await listener.AcceptTcpClientAsync();
                _ = HandleConnectionAsync(client); // use discard operator to suppress warning
            }
        }

        async Task HandleConnectionAsync(TcpClient client)
        {
            var stream = client.GetStream();

            // Read handshake request
            var buffer = new byte[1024];
            var bytes = await stream.ReadAsync(buffer, 0, buffer.Length);
            var request = Encoding.UTF8.GetString(buffer, 0, bytes);

            // Send handshake response
            var response = "HTTP/1.1 101 Switching Protocols\r\n" +
                           "Upgrade: websocket\r\n" +
                           "Connection: Upgrade\r\n" +
                           "Sec-WebSocket-Accept: " + Convert.ToBase64String(
                               System.Security.Cryptography.SHA1.Create()
                                   .ComputeHash(Encoding.UTF8.GetBytes(
                                       new System.Text.RegularExpressions.Regex("Sec-WebSocket-Key: (.*)").Match(request).Groups[1].Value.Trim() + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                                   ))
                           ) + "\r\n\r\n";
            await stream.WriteAsync(Encoding.UTF8.GetBytes(response), 0, response.Length);

            // Read and write frames
            while (true)
            {
                bytes = await stream.ReadAsync(buffer, 0, buffer.Length);
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
                this.broker.PostDebugMessage(message);

                // Echo frame back
                await stream.WriteAsync(new byte[] { 0x81, (byte)payload.Length }, 0, 2);
                await stream.WriteAsync(payload, 0, payload.Length);
            }
        }
    }
}