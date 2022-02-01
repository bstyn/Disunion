import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardGitfcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import NotificationIcon from '@material-ui/icons/Notifications'
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded'
import PeopleAltRounderIcon from '@material-ui/icons/PeopleAltRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import './Chat.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../Sidebar/appSlice';
import { selectUser } from '../Login/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { loadMessage, selectMessage } from './messagesSlice';
import Message from '../Message/Message';
import axios from 'axios'


function Chat() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const channelName = useSelector(selectChannelName)
    const [input,setInput] = useState('')
    const channelId = useSelector(selectChannelId)
    const mqtt = require("mqtt/dist/mqtt")
    const client = mqtt.connect('mqtt://127.0.0.1:8000/mqtt')
    const [Messages,setMessages] = useState()

    function sendMsg(e){
        const id = uuidv4()
        e.preventDefault()
        if(input === '' ){
            return
        }
        let today = new Date().toISOString().slice(0, 10)
        axios.post("http://localhost:5000/messages/",{id: id,channelId:channelId,text:input,username: user.nickname,url: user.url,timestamp: today})
        client.publish("chat",JSON.stringify({messageId: id,channelId:channelId,text:input,username: user.nickname,url: user.url,timestamp: today}))
        setInput('')      
    }
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`http://localhost:5000/messages/${channelId}`)
            console.log(response)
            response = await response.data.Messages
            dispatch(loadMessage(response))}
        fetchMyAPI()
      },[channelId])
    const messageList = useSelector(selectMessage)
    useEffect(() => {
        setMessages(messageList.filter(message => message.channelId === channelId))
    },[messageList,setMessages,channelId])
    return (
        
        <div className='chat'>
            {channelName ?
            <>
            <div className="chat-header">
                <div className="chat-header-left">
                    <h3>
                        <span className='chat-header-hash'>#</span>
                        {channelName}
                    </h3>
                </div>
                <div className="chat-header-right">
                    <NotificationIcon />
                    <EditLocationRoundedIcon />
                    <PeopleAltRounderIcon />
                    <div className="chat-header-search">
                        <input placeholder='Search'/>
                        <SearchRoundedIcon />
                    </div>
                    <SendRoundedIcon />
                    <HelpRoundedIcon />
                </div>  
            </div>

            <div className='chat-messages'>
                {Messages.map(({id,text,username,url,timestamp}) => (
                     <Message key={id} id={id} text={text} username={username} url={url} timestamp={timestamp}/>
                ))}
            </div>

            <div className='chat-input'>
            <AddCircleIcon className='add-circle' />
            <form>
                <input  value={input} 
                        type="text" 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message #${channelName}`} />
                <button onClick={sendMsg}className='chat-input-button'type='submit'>Send Message</button>
            </form>
            <div className="chat-input-icons">
                <CardGitfcardIcon />
                <GifIcon />
                <EmojiEmotionsIcon />
            </div>
        </div>
            </>
            :<></>}
        </div>

    );
}

export default Chat;
