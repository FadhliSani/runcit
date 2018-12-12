const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date
    },
    roles: [{ 
        type: String 
    }],
    isVerified: { 
        type:Boolean, 
        default: false 
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }
});

const User = module.exports = mongoose.model("User", userSchema, "users");

// find user by id
module.exports.getUserbyId = function(id, callback) {
    User.findById(id, callback);
}

// find user by username
module.exports.getUserbyUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

// compare password
module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

// add new user
module.exports.addNewUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// update user information

// delete user by id