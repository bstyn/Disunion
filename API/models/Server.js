const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    id: String,
    name: String,
    users: Array,
});

module.exports = model('Server', serverSchema);