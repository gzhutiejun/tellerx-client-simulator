const WebSocket = require("ws");
let sessionId = 1;
// Create a WebSocket server instance on a specific port
const wss = new WebSocket.Server({ port: 9500 });

console.log("WebSocket server is running on ws://localhost:9500");

// Event listener for new client connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send a welcome message to the newly connected client
  // ws.send("Welcome to the WebSocket server!");

  // Event listener for messages received from a client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    const messageObject = JSON.parse(message);

    switch (messageObject.method) {
      case "createSession":
        console.log("createSession: ", messageObject.id);

        let res = {
          method: "createSession",
          id: "AJMN0003S20251029140155082",
          jsonrpc: "2.0",
          result: true,
        };
        setTimeout(() => {
          console.log("Sending createSession response");
          ws.send(JSON.stringify(res));
        }, 1000);

        res = {
          method: "session_created",
          jsonrpc: "2.0",
          result: true,
          params: { session_id: sessionId++ },
        };

        setTimeout(() => {
          console.log("Sending session_created response");
          ws.send(JSON.stringify(res));
        }, 2000);

        break;
      case "closeSession":
        console.log("closeSession: ", messageObject.id);
        break;
      case "setSessionData":
        console.log("setSessionData: ", messageObject.id);
        let resp = {
          method: "setSessionData",
          id: "AJMN130120251105111722807",
          jsonrpc: "2.0",
          params: {
            Language: "en",
            ignore_cim: null,
            current_session: { ndc: {}, extra: [], selected_transaction: {} },
          },
        };
        setTimeout(() => {
          console.log("Sending setSessionData response");
          ws.send(JSON.stringify(resp));
        }, 2000);

        resp = {
          method: "assistanceended",
          jsonrpc: "2.0",
          result: true,
        };
        setTimeout(() => {
          console.log("Sending assistanceended response");
          ws.send(JSON.stringify(resp));
        }, 4000);

        break;
      case "runFlow":
        console.log("runFlow: ", messageObject.params?.flow);
        break;
      case "runState":
        console.log("runState: ", messageObject.state);
        break;
      case "updateViewport":
        console.log("updateViewport: ", messageObject.id);
        break;
      case "cancelRequestAssistance":
        console.log("cancelRequestAssistance: ", messageObject.id);
        break;
      default:
        console.log("Unknown method:", messageObject.method);
    }
  });

  // Event listener for client disconnections
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Event listener for errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});
