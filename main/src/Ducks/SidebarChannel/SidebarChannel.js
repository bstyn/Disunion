import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannel } from '../Sidebar/appSlice';
import './SidebarChannel.css'

function SidebarChannel({ id , channelName}) {
  const dispatch = useDispatch();
  return ( 
    <div className="sidebarchannel" onClick={() => dispatch(setChannel({channelId: id, channelName: channelName}))}> 
        <h4><span className='sidebarchannel-hash'>#</span>{channelName}</h4>
    </div>
  )
}

export default SidebarChannel;
