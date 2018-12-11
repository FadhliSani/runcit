
const mongoose = require('mongoose');
const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const methodOverride = require('method-override');

const config = require('../config/database');

const router = express.Router();

let gfs;
mongoose.connection.on('connected', () => {
    console.log('gfs is connected to database.');
    gfs = grid(mongoose.createConnection(config.database, { useNewUrlParser: true }), mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new gridFsStorage({
    url: config.database,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileinfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileinfo)
            });
        });
    }
});

const upload = multer({storage});


router.get('/', (req,res) => {
    res.send('get all images');
});

// uploads file to db
router.post('/upload', upload.single('file'), (req, res) => {
    console.log("upload");
    // res.redirect('/');
});

module.exports = router;