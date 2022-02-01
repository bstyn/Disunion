import { Avatar } from '@material-ui/core';
import React from 'react';
import './Message.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteMessage, editMessage } from '../Chat/messagesSlice';

function Message({id,text,username,url,timestamp}) {
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/messages/${id}`)
        dispatch(deleteMessage(id)) 
    }
    const handleRename = (id) => {
        let NewMessage = prompt("Please enter new message:")
        if (NewMessage === null || NewMessage === ''){
            return
        }else{
            dispatch(editMessage({id:id,text:NewMessage}))
            axios.put(`http://localhost:5000/messages/${id}`,{text: NewMessage})
        }
    }
    return <div className='message'>
        <div className='message-left'>
            <div className="message-info">
                <Avatar src={url} />
                <h4>
                    {username}
                    <span className="message-timestamp">
                        {timestamp.slice(0,10)}
                    </span>
                    <p>{text}</p>
                </h4>
                
            </div> 
            <div className="buttons">
                <div className="message-delete" onClick={() => handleDelete(id)}><DeleteIcon /></div>   
                <div className="message-delete" onClick={() => handleRename(id)}><EditIcon /></div>   
            </div>
            
        </div>
    </div>;
}

export default Message;
