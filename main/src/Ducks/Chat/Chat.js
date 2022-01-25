import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import './Chat.css'
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';

function Chat() {
    return (
        <div className='chat'>
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </div>
    );
}

export default Chat;
