const mqtt = require("mqtt")
var client = mqtt.connect('mqtt://127.0.0.1:1883/mqtt')

client.on("connect", function(){
    let random = Math.random()*50
    client.publish("chat",random.toString())
})