const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    id: String,
    message: String,
    timestamp: Date,
});

module.exports = model('Message', messageSchema);