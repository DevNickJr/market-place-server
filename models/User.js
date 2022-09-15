const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type:String, 
        required: true,
        unique: true,
        message: "Already exists"
    },
    password: {
        type:String, 
        required: true
    },
    email: {
        type:String, 
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean, 
        required: true,
        default: false,
    },

    
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;