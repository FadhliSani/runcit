const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/database');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.connect(config.database, { useNewUrlParser: true });

const app = express();

const items = require('./routes/items');
//const users = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', items);
// app.use('/users', users);

app.get('*', (req, res) => {
    res.send(path.join(__dirname, 'public/index.html'));
});

app.listen(config.port, () => {
    console.log("Server is running on port: "+config.port);
})