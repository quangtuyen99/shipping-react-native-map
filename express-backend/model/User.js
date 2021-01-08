const mongoose = require("mongoose");

// Tạo 1 cấu trúc User
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
})

// Tao Collection 
const User = mongoose.model('User', userSchema)

module.exports = User;