import { Server } from "socket.io"
import express from "express"

const app = express();

const PORT = process.env.PORT || 3001;

const httpServer = app.listen(PORT, () => {
    console.log(`Server is now listening to PORT ${PORT}`)
});


const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {

    console.log(`User ${socket.id} connected`);

    // Upon connection - only to current user
    socket.emit("message", "Welcome to Chat App");

    // Upon connection - to all other users
    socket.broadcast.emit("message", `User ${socket.id.substring(0, 5)} connected`)

    // Upon disconnection - to all other users

    socket.on("disconnect", () => {
        socket.broadcast.emit("message", `User ${socket.id.substring(0, 5)} disconnected`)
    })

    // capturing the activity event

    socket.on("activity", (name) => {
        socket.broadcast.emit("activity", name);
    })

    socket.on("message", (data) => {
        console.log(data);
        io.emit("message", `${socket.id.substring(0, 5)}: ${data}`)
    })
})