const express = require('express');
const router = express.Router();
const multer = require('multer');
const eyetower = require('../Classes/EyeTower');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos/');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase());
    }
});
const upload = multer({ storage: fileStorage });

router.post('/add_camera', (req, res) => {
    eyetower.addCamera(req.body).then((results, error) => {
        if (error) {
            req.flash('error-msg', 'Error Adding Camera');
            res.redirect('/Add_camera');
            return;
        } else {
            req.flash('success-msg', 'New Camera Added Successfully!');
            res.redirect('/Add_camera');
        }
    })
});

router.post('/add_user', async (req, res) => {
    var flag = true;
    await eyetower.findUser(req.body.email).then((results) => {
        if (results.length > 0) {
            // user exists
            req.flash('error-msg', 'User Already Exist');
            res.redirect('/Add_user');
            flag = false;
            return;
        }
    }).catch((error) => {
        console.log(error);
        req.flash('error-msg', 'Error Adding User');
        res.redirect('/Add_user');
    });
    if (flag) {
        eyetower.addUser(req.body).then((results) => {
            req.flash('success-msg', 'New User Added Successfully!');
            res.redirect('/Add_user');
        }).catch((error) => {
            console.log(error);
            req.flash('error-msg', 'Error Adding User');
            res.redirect('/Add_user');
        });
    }
});

router.post('/add_person', upload.single('photo'), async (req, res) => {
    var person = req.body;
    person['photoUrl'] = req.file.path.substring(7);
    var flag = true;
    await eyetower.findPerson(req.body.name).then((results) => {
        if (results.length > 0) {
            // user exists
            req.flash('error-msg', 'Person Already Exist');
            res.redirect('/Add_person');
            flag = false;
            return;
        }
    }).catch((error) => {
        console.log(error);
        req.flash('error-msg', 'Error Adding Person');
        res.redirect('/Add_person');
    });
    if (flag) {
        eyetower.addPerson(person).then((results) => {
            req.flash('success-msg', 'New Person Added Successfully!');
            res.redirect('/Add_person');
        }).catch((error) => {
            console.log(error);
            req.flash('error-msg', 'Error Adding User');
            res.redirect('/Add_user');
        });
    }
});


module.exports = router;