const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config/database');

const authenticate = passport.authenticate('jwt', {session: false});

// register
router.post('/register', (req, res, next) => {

    var newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.date_updated = Date.now();

    User.addNewUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'error adding new user'});
        } else {
            res.json({success: true, msg: 'successfully added new user'});
        }
    });
});

// authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserbyUsername(username, (err, user) => {
        if(err) throw err;

        // if no user found
        if(!user) {
            return res.json({success: false, msg: "No username found"});
        }

        // if user found, compare password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign(JSON.parse(JSON.stringify(user)), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.json({success: false, msg: "Wrong password"});
            }
        });
    });
});

// profiled
router.get('/profile', authenticate, (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;