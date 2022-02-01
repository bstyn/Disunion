const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    id: String,
    channelId: String,
    text: String,
    username: String,
    url: String,
    timestamp: Date,
});

module.exports = model('Message', messageSchema);