import React from 'react';
import NotificationIcon from '@material-ui/icons/Notifications'
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded'
import PeopleAltRounderIcon from '@material-ui/icons/PeopleAltRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import './ChatHeader.css'

function ChatHeader() {
  return (
      <div className="chat-header">
            <div className="chat-header-left">
                <h3>
                    <span className='chat-header-hash'>#</span>
                    ogólny
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
  )
}

export default ChatHeader;
