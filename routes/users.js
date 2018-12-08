const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date
    }
});

const User = module.exports = mongoose.model("User", userSchema, "users");