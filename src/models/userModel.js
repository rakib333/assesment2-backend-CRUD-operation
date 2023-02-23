const mongoose = require('mongoose');

const userData = mongoose.Schema({
    name: {type: String},
    email: { type: String, unique: true },
    password: { type: String },
    date : {type: Date, default: Date.now()}
}, {versionKey: false});

const userModel = mongoose.model('users', userData);
module.exports = userModel;