const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 이메일 띄어쓰지 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type:String, 
        maxlength:50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = { User }