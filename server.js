const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const items = require('./routes/items');

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', items);

app.get('/', (req, res) => {
    res.send('it works!');
});

app.listen(PORT, () => {
    console.log("Server is running on port: "+PORT);
})