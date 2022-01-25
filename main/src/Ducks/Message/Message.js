import { Avatar } from '@material-ui/core';
import React from 'react';
import './Message.css'

function Message() {
    return <div className='message'>
        <Avatar />
            <div className="message-info">
                <h4>
                    Bati
                    <span className="message-timestamp">
                        TimeStamp
                    </span>
                </h4>
                <p>Message</p>
        </div>    
    </div>;
}

export default Message;
