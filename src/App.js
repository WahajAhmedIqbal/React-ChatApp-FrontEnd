import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat';

const socket = io.connect('http://localhost:3001')

function App() {
  const [userName, setuserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setshowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit('join_room', room)
      setshowChat(true)
    }

  }
  return (
    <div className="App">
      {!showChat ?
        (<div className="joinChatContainer">
          <h3>
            Join Chat
          </h3>
          <input type="text" placeholder='john...' onChange={(e) => {
            setuserName(e.target.value)
          }} />
          <input type="text" placeholder='john...' onChange={(e) => {
            setRoom(e.target.value)
          }} />
          <button onClick={joinRoom}>
            join a Room
          </button>
        </div>) :
        <Chat socket={socket} username={userName} room={room} />
      }
    </div>
  );
}

export default App;
