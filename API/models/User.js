const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: String,
    email: String,
    url: String,
    nickname: String,
    password: String
});

module.exports = model('User', userSchema);