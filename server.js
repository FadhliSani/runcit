const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const config = require('./config/database');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const methodOverride = require('method-override');

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log("Database connected to: " +config.database);
});

mongoose.connection.on('error', () => {
    console.log("Error connecting to database");
});



const app = express();

const items = require('./routes/items');
const users = require('./routes/users');
const upload = require('./routes/uploads');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/items', items);
app.use('/users', users);
app.use('/images', upload);

app.get('*', (req, res) => {
    res.send(path.join(__dirname, 'public/index.html'));
});

app.listen(config.port, () => {
    console.log("Server is running on port: "+config.port);
});