const express = require('express');
const bodyParser = require('body-parser')

let app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('it works!');
});

app.listen(PORT, () => {
    console.log("Server is running on port: "+PORT);
})