const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../public/videos');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, 'temp.webm');  // Temporary name
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('video'), (req, res) => {
    const { startTime, endTime, cam } = req.body;
    if (!startTime || !endTime || !cam) {
        return res.status(400).send('Missing startTime or endTime or cam');
    }

    const oldPath = path.join(__dirname, '../public/videos/temp.webm');
    const newPath = path.join(__dirname, `../public/videos/${startTime}_${endTime}_${cam}.webm`);

    try {
        fs.renameSync(oldPath, newPath);
        //console.log('File renamed successfully');
        res.send('Video recorded successfully');
    } catch (err) {
        console.error('Error renaming file:', err);
        return res.status(500).send('Error renaming file');
    }
});

module.exports = router;
