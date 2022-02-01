import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannel } from '../Sidebar/appSlice';
import './SidebarChannel.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { deleteChannel, editChannel } from '../Sidebar/channelSlice';

function SidebarChannel({ id , channelName}) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/channels/${id}`)
    dispatch(deleteChannel(id)) 
}
  const handleRename = (id) => {
    let NewName = prompt("Please enter new name:")
    if (NewName === null || NewName === ''){
        return
    }else{
        dispatch(editChannel({id:id,channelName:NewName}))
        axios.put(`http://localhost:5000/channels/${id}`,{channelName: NewName})
    }
}
  return ( 
    <div className="sidebarchannel" > 
        <h4 onClick={() => dispatch(setChannel({channelId: id, channelName: channelName}))} ><span className='sidebarchannel-hash'>#</span>{channelName}</h4>
        <div className="buttons">
                <div className="message-delete" onClick={() => handleDelete(id)}><DeleteIcon /></div>   
                <div className="message-delete" onClick={() => handleRename(id)}><EditIcon /></div>   
        </div>
    </div>
  )
}

export default SidebarChannel;
