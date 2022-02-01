const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
    id: String,
    name: String,
});

module.exports = model('Channel', channelSchema);