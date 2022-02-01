import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import './Chat.css'
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';
import { useSelector } from 'react-redux';
import { selectChannelName } from '../Sidebar/appSlice';

function Chat() {
    const channelName = useSelector(selectChannelName)
    return (
        
        <div className='chat'>
            {channelName ?
            <>
            <ChatHeader channelName={channelName}/>
            <ChatMessages />
            <ChatInput  channelName={channelName}/>
            </>
            :<></>}
        </div>

    );
}

export default Chat;
