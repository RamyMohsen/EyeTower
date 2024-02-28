const express = require('express');
const router = express.Router();
const multer = require('multer');
const eyetower = require('../Classes/EyeTower');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos/');
    },
    filename: (req, file, cb) => {
        cb(null, req.query.name + file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase());
    }
});
const upload = multer({ storage: fileStorage });

router.put('/update_user/:id', (req, res) => {
    let id = req.params.id;
    let updates = req.body;

    eyetower.modifyUser(id, updates).then((results) => {
        req.flash('success-msg', 'User Data Changed Successfully!');
        res.json({ redirect: '/User_P/' + req.body.email });
    }).catch((error) => {
        console.log(error);
        req.flash('error-msg', 'Error Changing User data');
        res.json({ redirect: '/User_P/' + req.body.email });
    });
});

router.put('/update_person/:id', upload.single('photo'), (req, res) => {
    let id = req.params.id;
    let updates = JSON.parse(req.body.data);
    if (req.file){
        updates['photo_url'] = req.file.path.substring(7);
    }
    eyetower.modifyPerson(id, updates).then((results) => {
        req.flash('success-msg', 'Person Data Changed Successfully!');
        res.json({ redirect: '/Person_P/' + updates.name });
    }).catch((error) => {
        console.log(error);
        req.flash('error-msg', 'Error Changing Person data');
        res.json({ redirect: '/Person_P/' + updates.name });
    });

});


module.exports = router;