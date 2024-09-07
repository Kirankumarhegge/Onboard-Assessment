const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    nickname: String,
    createdAt : Number,
    updatedAt : Number,
    password : String
})

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
