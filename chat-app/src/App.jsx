
import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect("http://localhost:3000")

function App() {

  const [username,setUsername] = useState("")
  const [room,setRoom] = useState("")
  const [ShowChat,setShowChat] = useState(false)



  //giving condition that username 
const joinRoom=()=>{
if (username!=="" && room!=="") {
  socket.emit("join_room",room)
  setShowChat(true)
}
}


  return (
    <div className="App">
      {!ShowChat?(
     <div className='joinChatContainer'>  <h3>
        join a chat
      </h3>

      <input type="text"  placeholder='Name...' onChange={(event)=>{setUsername(event.target.value)}}/>

      <input type="text" placeholder='Room id...' onChange={(event)=>{setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>join the Room</button>
    </div>
  )
    : (
      <Chat socket={socket} username={username} room={room}/>
      )}
      </div>
    
  );
}

export default App;
