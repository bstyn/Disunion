import React from 'react';
import mqtt from 'mqtt/dist/mqtt'
import { addChannel } from './Ducks/Sidebar/channelSlice'
import { store } from '../src/store/store'
import { addMessage } from './Ducks/Chat/messagesSlice';


function ConnectMqtt() {
    const client = mqtt.connect("mqtt://127.0.0.1:8000/mqtt")

    client.on('connect', function(){
        client.subscribe('chat')
        client.subscribe('channel')
      })
    client.on("message", function(topic,message){
          if(topic === 'chat'){
                const msg = JSON.parse(message)
                store.dispatch(addMessage({id: msg.messageId,channelId: msg.channelId,text: msg.text,username: msg.username,url:msg.url,timestamp: msg.timestamp}))
          }
          if(topic === 'channel'){
                const msg = JSON.parse(message)
                store.dispatch( addChannel({id: msg.channelId,server_id:msg.server_id,channelName:msg.channelName}))
          }
      })
  return (<div></div>);
}

export default ConnectMqtt;





