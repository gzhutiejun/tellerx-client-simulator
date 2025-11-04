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
        const sessionCreatedResp = {
          method: "session_created",
          jsonrpc: "2.0",
          result: true,
          params: {
            session_id: sessionId++,
          },
        };

        setTimeout(() => {
          ws.send(JSON.stringify(sessionCreatedResp));
        }, 2000);

        const assistanceEndedResp = {
          method: "assistanceended",
          jsonrpc: "2.0",
          result: true,
        };

        setTimeout(() => {
          ws.send(JSON.stringify(assistanceEndedResp));
        }, 8000);

        break;
      case "closeSession":
        console.log("closeSession: ", messageObject.id);
        break;
      case "setSessionData":
        console.log("setSessionData: ", messageObject.id);
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
