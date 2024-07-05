const express = require('express')  //creating a variable

const app = express();//creating instance
const http = require("http");//to build server    
const cors = require("cors");
const{Server}= require("socket.io")  //server exists in socket

app.use(cors());// socket io comes with many issus to resolve it



const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin :  "http://localhost:5173", //it is ok to connect with this port
        methods:["GET","POST"]
    },
});


io.on("connection",(socket)=>{
console.log(`User connected ${socket.id}`)


socket.on("join_room",(data)=>{   //data will ne name and roomid
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room : ${data}`)
})

socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data)
   console.log(data)
});

socket.on("disconnect",()=>{
console.log("user disconnected",socket.id)
})
})   //socket is based on events and this is telling that  means we are listening to connections
server.listen(3000,()=>{
    console.log('server running')
})