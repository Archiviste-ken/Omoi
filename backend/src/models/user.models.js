const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    username:{
        type: String,
        require: [true, "Username is required"],
        unique: [ true, "Username must be unique"]
    },

    password:{
        type: String,
        require: [true, "password is required"],
        select: false      // REMEMBER
    },

    email: {
        type: String,
        require: [true, "Email is required"],
        unique: [true, "Email must be unique"],
    }

})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;
