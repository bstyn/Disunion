const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
    id: String,
    server_id: String,
    channelName: String,
});

module.exports = model('Channel', channelSchema);