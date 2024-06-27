const ws = require("ws");
const http = require("http");

const httpServer = http.createServer();

httpServer.listen(3001);

const wsServer = new ws.WebSocketServer({
    server: httpServer
})

wsServer.on("connection", (socket) => {
    console.log("Connection established");
    socket.on("message", (data) => {
        const b = Buffer.from(data).toString();
        console.log(b, "data");
        socket.send(`${data}`)
    })
})