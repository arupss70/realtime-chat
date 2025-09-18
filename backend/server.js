// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);``

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive and broadcast chat messages
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  // Typing indicator
  socket.on("typing", (username) => {
    socket.broadcast.emit("showTyping", username);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
