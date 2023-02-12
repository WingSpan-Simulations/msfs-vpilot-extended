using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Sockets;
using System.Net;
using RossCarlson.Vatsim.Vpilot.Plugins;
using static System.Text.Encoding;
using System.Security.Cryptography;
using System.Threading;

namespace vPilotExtended
{
    internal class Server
    {
        public IBroker broker;
        static Socket serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.IP);
        static private string guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

        public Server(IBroker broker)
        {
            this.broker = broker;
        }

        public void Initialize()
        {
            serverSocket.Bind(new IPEndPoint(IPAddress.Any, 8080));
            serverSocket.Listen(128);
            serverSocket.BeginAccept(null, 0, OnAccept, null);
            this.broker.PostDebugMessage("WebSocket server opened on 127.0.0.1:8080");
        }

        private void OnAccept(IAsyncResult result)
        {
            byte[] buffer = new byte[1024];
            try
            {
                Socket client = null;
                string headerResponse = "";
                if (serverSocket != null && serverSocket.IsBound)
                {
                    client = serverSocket.EndAccept(result);
                    var i = client.Receive(buffer);
                    headerResponse = UTF8.GetString(buffer).Substring(0, i);
                    this.broker.PostDebugMessage(headerResponse);
                }

                if (client != null)
                {
                    /* Handshaking and managing ClientSocket */
                    var key = headerResponse.Replace("ey:", "`").Split('`')[1].Replace("\r", "").Split('\n')[0].Trim();

                    // key should now equal dGhlIHNhbXBsZSBub25jZQ==
                    var test1 = AcceptKey(ref key);

                    string newLine = "\r\n";
                    var response = "HTTP/1.1 101 Switching Protocols" + newLine
                        + "Upgrade: websocket" + newLine
                        + "Connection: Upgrade" + newLine
                        + "Sec-WebSocket-Accept" + test1 + newLine + newLine
                        //+ "Sec-WebSocket-Protocol: chat, superchat" + newLine
                        //+ "Sec-WebSocket-Version: 13" + newLine
                        ;

                    client.Send(UTF8.GetBytes(response));
                    var i = client.Receive(buffer);

                    this.broker.PostDebugMessage(System.Convert.ToBase64String(buffer).Substring(0, i));
                    var subA = SubArray<byte>(buffer, 0, i);
                    client.Send(subA);
                    Thread.Sleep(10000);
                }
            } catch (SocketException exception) {
                throw exception;
            } finally
            {
                if (serverSocket != null && serverSocket.IsBound) {
                    serverSocket.BeginAccept(null, 0, OnAccept, null);
                }
            }
        }

        public static T[] SubArray<T>(T[] data, int index, int length)
        {
            T[] result = new T[length];
            Array.Copy(data, index, result, 0, length);
            return result;
        }

        private static string AcceptKey(ref string key)
        {
            string longKey = key + guid;
            byte[] hashBytes = ComputeHash(longKey);
            return System.Convert.ToBase64String(hashBytes);
        }

        static SHA1 sha1 = SHA1CryptoServiceProvider.Create();
        private static byte[] ComputeHash(string str)
        {
            return sha1.ComputeHash(ASCII.GetBytes(str));
        }
    }
}
