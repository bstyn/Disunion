import React from 'react';
import './ChatMessages.css'
import Message from '../Message/Message';

function ChatMessages() {
  return  (
      <div className='chat-messages'>
          <Message />
          <Message />
          <Message />
      </div>
  );
}

export default ChatMessages;
