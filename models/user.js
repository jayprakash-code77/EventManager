const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    dob:{
        type: String, 
        required: true
    },
    gender:{
        type: String,
        enum: ["male", "female", "other"],
        default: "",
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin","faculty"],
        default: "student",
        required:true
    },
}, { 
    timestamps: true 
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;