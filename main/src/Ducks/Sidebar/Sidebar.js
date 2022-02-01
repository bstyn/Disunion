import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MicIcon from '@material-ui/icons/Mic'
import AddIcon from '@material-ui/icons/Add'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'

import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarChannel from '../SidebarChannel/SidebarChannel'
import { Avatar } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { changeNickname, logout, selectUser } from '../Login/userSlice'
import png from './default_avatar.png'
import { useParams } from 'react-router-dom'
import { selectServer } from '../Servers/serverSlice'
import { loadChannel, selectChannel } from './channelSlice'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


const Sidebar = () => {
    let { id } = useParams()
    const server = useSelector(selectServer).find(server => server.id === id)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [channels, setChannels] = useState([])
    const mqtt = require("mqtt/dist/mqtt")
    const client = mqtt.connect('mqtt://127.0.0.1:8000/mqtt')

    const channelList = useSelector(selectChannel)
    
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`http://localhost:5000/channels/${id}`)
            response = await response.data.Channels
            dispatch(loadChannel(response))}
        fetchMyAPI()
      },[id])
    useEffect(() => {
        setChannels(channelList)
    },[channelList,setChannels])
    const addChannels = ({id}) => {
        let channel = prompt("Please enter channel name:")
        if (channel === null || channel === ""){
            return
        }else{
            const channelId = uuidv4()
            axios.post("http://localhost:5000/channels/",{id:channelId,server_id:id,channelName:channel})
            client.publish("channel",JSON.stringify({channelId: channelId, server_id: id,channelName:channel }))
        }
    }
    const confirmLogout = () => {
        const result = window.confirm("Do you want to logout?")
        if(result){
            dispatch(logout())
        }
    }
    const changeUsername = () => {
        let newNickname = prompt("Please enter new nickname")
        if (newNickname === null || newNickname === ''){
            return
        }else{
            dispatch(changeNickname(newNickname))
            axios.put(`http://localhost:5000/users/${user.id}`,{nickname: newNickname})
        }
    }
    return(
        <div className ="sidebar">
            
            <div className='sidebar-current-server-header'>
                {server && id ? 
                    <>
                    {(server.name.length < 18) ? <h3>{server.name}</h3> : <h3>{server.name.substring(0,18).concat("...")}</h3>}
                    <ExpandMoreIcon />
                    </>
                        : 
                        null}               
            </div>
            <div className="sidebar-channels">
                <div className="sidebar-channels-header">
                    {server ? <>
                    <div className="sidebar-channels-header-top">
                        <ExpandMoreIcon /> 
                        <h4>KANAŁY TEKSTOWE</h4>
                    </div>
                    <AddIcon onClick={() => addChannels({id:id})} className='sidebar-addServer' /></>: <></>}
                </div>
                <div className="sidebar-text-channels">
                    {channels.filter(channel => channel.server_id === id).map(({id, channelName}) => (
                        <SidebarChannel key={id} id={id} channelName={channelName}/>
                    ))}
                </div>
            </div>
            
            <div className="sidebar-profile">
                { !user.url ? <Avatar  className="avatar" onClick={() => confirmLogout()} src={png} sx={{ fontsize: 5 }} />: <Avatar className="avatar" onClick={() => dispatch(logout())} src={user.url} sx={{ fontsize: 5 }} />}
                <div className="sidebar-profile-info"> 
                    <h3>{user.nickname}</h3>
                    <p>#{user.id.substring(0,4)}</p>
                </div>
                <div className="sidebar-profile-icons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon className="settings" onClick={() => changeUsername()} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;