const express = require('express');  // Creating a variable
const app = express();  // Creating instance
const http = require("http");  // To build server    
const cors = require("cors");
const { Server } = require("socket.io");  // Server exists in socket
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config()

app.use(cors());  // Socket.io comes with many issues, to resolve it

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/chat-app/dist')));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'chat-app', 'dist', 'index.html'))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
    console.log(process.env.NODE_ENV)

  });
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // It is ok to connect with this port
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {  // Data will be name and room ID
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
