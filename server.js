const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/database');
const mongoose = require('mongoose');

mongoose.connect(config.database);

const app = express();

const items = require('./routes/items');
//const users = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', items);
// app.use('/users', users);

app.get('/', (req, res) => {
    res.send('it works!');
});

app.listen(config.port, () => {
    console.log("Server is running on port: "+config.port);
})