const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    id: String,
    Name: String,
});

module.exports = model('Server', serverSchema);