import { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'


const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [mesageList, setMesageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" +
                    new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setMesageList(list => [...list, messageData])
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMesageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>
                    Live Chat
                </p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {
                        mesageList.map((item) => {
                            return <div className='message' id={username === item.author ? 'you' : "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>
                                            {item.message}
                                        </p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id="time">
                                            {
                                                item.time
                                            }
                                        </p>
                                        <p id="author">
                                            {
                                                item.author
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type='text' placeholder='type Message...'
                    // onKeyPress={(e) => {
                    //     e.key = 'Enter' && sendMessage()
                    // }}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}

                />

                <button onClick={sendMessage}>
                    &#9658;
                </button>
            </div>

        </div>
    )
}

export default Chat
