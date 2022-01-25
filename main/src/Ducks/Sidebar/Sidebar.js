import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MicIcon from '@material-ui/icons/Mic'
import AddIcon from '@material-ui/icons/Add'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'

import React from 'react'
import './Sidebar.css'
import SidebarChannel from '../SidebarChannel/SidebarChannel'
import { Avatar } from '@material-ui/core'

const Sidebar = () => {
    return(
        <div className ="sidebar">
            
            <div className='sidebar-current-server-header'>
                <h3>Plantacja Bawełny</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar-channels">
                <div className="sidebar-channels-header">
                    <div className="sidebar-channels-header-top">
                        <ExpandMoreIcon /> 
                        <h4>KANAŁY TEKSTOWE</h4>
                    </div>
                    <AddIcon className='sidebar-addServer' />
                </div>
                <div className="sidebar-text-channels">
                    <SidebarChannel />
                    <SidebarChannel />
                    <SidebarChannel />
                    <SidebarChannel />
                </div>
            </div>
            
            <div className="sidebar-profile">
                <Avatar sx={{ fontsize: 5 }} />
                <div className="sidebar-profile-info"> 
                    <h3>Huharz</h3>
                    <p>#2137</p>
                </div>
                <div className="sidebar-profile-icons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;