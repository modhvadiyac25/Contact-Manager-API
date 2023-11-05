const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Provide the name"],
        },
        email:{
            type: String,
            required: [true, "Please provide the email"],
            unique:[true, "This email is already in use"],
        },
        password:{
            type:String,
            required:[true, "Please provide the password"]
        },
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("User",userSchema);