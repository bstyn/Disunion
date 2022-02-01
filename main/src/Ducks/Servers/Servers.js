import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add'
import { v4 as uuidv4 } from 'uuid';
import './Servers.css'
import { useDispatch, useSelector} from 'react-redux';
import { addServer, selectServer, joinServer } from "./serverSlice"
import { Link } from 'react-router-dom';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { selectUser } from '../Login/userSlice';
import { setChannel } from '../Sidebar/appSlice';


function Servers() {
    const dispatch = useDispatch()
    const [servers,setServers] = useState([])
    const user = useSelector(selectUser)
    const addServers = () => {
        let server = prompt("Please enter server name:")
        if (server !== null || server !== ""){
            dispatch( addServer({id: uuidv4(),name:server,users:[user.id]}))
        }
    }
    const joinServers = () => {
        let server = prompt("Please enter server id:")
        if (server !== null || server !== ""){
            dispatch( joinServer({server_id:server,id: user.id }))
        }
    }
    const serverList = useSelector(selectServer)
    useEffect(() => {
        setServers(serverList)
    },[serverList,setServers])
    return (
        <div className="servers">
            <div className="server-list">
                {servers.filter(server => server.users.includes(user.id)).map(server => 
                    (<Link to={`/${server.id}`} onClick={() => dispatch(setChannel({id: null,className: null}))} className="server"  key={server.id}><p>{server.name.substring(0,1)}</p></Link>)
                )}
            </div>
            <div className="server">
                <AddIcon onClick={() => addServers()} />
            </div>
            <div className="server">
                <AddLinkIcon onClick={() => joinServers()} />
            </div>
        </div>
    );
}

export default Servers;
