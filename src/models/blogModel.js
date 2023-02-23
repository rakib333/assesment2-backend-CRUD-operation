const mongoose = require('mongoose');

const blogData = mongoose.Schema({
    name: { type: String },
    email: {type: String},
    title: { type: String },
    author: { type: String , default: "Rakib"},
    content: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, {versionKey: false});

const blogModel = mongoose.model('blogs', blogData);
module.exports = blogModel;