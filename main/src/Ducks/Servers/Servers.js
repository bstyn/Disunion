import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add'
import { v4 as uuidv4 } from 'uuid';
import './Servers.css'
import { useDispatch, useSelector} from 'react-redux';
import { addServer, selectServer, joinServer, loadServer } from "./serverSlice"
import { Link } from 'react-router-dom';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { selectUser } from '../Login/userSlice';
import { setChannel } from '../Sidebar/appSlice';
import axios from 'axios'


function Servers() {
    const dispatch = useDispatch()
    const [servers,setServers] = useState([])
    const user = useSelector(selectUser)
    const addServers = () => {
        let server = prompt("Please enter server name:")
        if((server === null || server === "")){
            return
        }
        else{
            let id = uuidv4()
            axios.post('http://localhost:5000/servers',{id: id,name:server,users:[user.id]}).then(dispatch( addServer({id: id,name:server,users:[user.id]})))
        }
    }
    async function joinServers(){
        let server = prompt("Please enter server id:")
        if((server === null || server === "")){
            return
        }
        else {
            await axios.post('http://localhost:5000/servers/join',{id: server}).then(res => ((dispatch(addServer(res.data.Servers[0])),dispatch(joinServer({server_id:server,id: user.id}))))).catch(error => alert(error.error)) 
            await axios.post(`http://localhost:5000/servers/${server}`,{id: user.id})       
        }
    }
    const serverList = useSelector(selectServer)
    useEffect(() => {
        async function fetchMyAPI() {
            if (serverList.length === 0){
            let response = await axios.get(`http://localhost:5000/servers/${user.id}`)
            response = await response.data.Servers
            dispatch(loadServer(response))
            
            }
            else{
                setServers(serverList)
            }}
    
        fetchMyAPI()
      },[])
    useEffect(() => {
        setServers(serverList)
    },[serverList])
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
