const express = require('express');
const router = express.Router();
const eyetower = require('../Classes/EyeTower');
const { result } = require('lodash');

router.get('/Add_person', (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        res.render('Add_person', { title: 'Add Person', error: req.flash('error-msg'), success: req.flash('success-msg') });
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});


router.get('/Add_user', (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        res.render('Add_user', { title: 'Add User', error: req.flash('error-msg'), success: req.flash('success-msg') });
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});

router.get('/Add_camera', (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        res.render('Add_camera', { title: 'Add Cameras', error: req.flash('error-msg'), success: req.flash('success-msg') });
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
})

router.get('/Find', (req, res) => {
    console.log(req.session)
    if (req.session.loggedin == true) {  //If user is not logged in redirect to login page
        res.render('Find', { title: 'Find Person' });
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});


router.get('/List_persons', async (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        await eyetower.listAllPersons().then((results) => {
            res.render('List_persons', { title: 'List All Persons', persons: results });
        }).catch(err => console.log(err));
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});


router.get('/List_users', async (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        await eyetower.listAllUsers().then((results) => {
            res.render('List_users', { title: 'List All Users', users: results });
        }).catch(err => console.log(err));
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});

router.get('/List_cameras', async (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        await eyetower.listAllCameras().then((results) => {
            res.render('List_cameras', { title: 'List All Cameras', cameras: results });
        }).catch(err => console.log(err));
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});


router.get('/Login', (req, res) => {
    res.render('Login', { title: 'Login', msg: req.flash('error-msg') });
});


router.get('/Person_P/:id', (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        let name = req.params.id;
        eyetower.findPerson(name).then((results) => {
            res.render('Person_P', { title: 'Person Profile', person: results[0] });
        })
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});

router.get('/User_P/:id', (req, res) => {
    if (req.session.loggedin == true && req.session.user.type === 'admin') {  //If user is not logged in redirect to login page
        let email = req.params.id;
        eyetower.findUser(email).then((results) => {
            res.render('User_P', { title: 'User Profile', user: results[0] });
        })
    } else {
        req.flash('error-msg', 'You must login as admin first');
        res.redirect('/Login')
    }
});


router.get('/User_H', (req, res) => {
    if (req.session.loggedin == true) {  //If user is not logged in redirect to login page
        res.render('User_H', { title: 'Home', user: req.session.user });
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});

router.get('/View_alerts', (req, res) => {
    if (req.session.loggedin == true) {  //If user is not logged in redirect to login page
        res.render('View_alerts', { title: 'View Live Feed' });
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});

router.get('/View_live', (req, res) => {
    if (req.session.loggedin == true) {  //If user is not logged in redirect to login page
        res.render('View_live', { title: 'View Live Feed' });
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});


router.get('/View_recorded', (req, res) => {
    if (req.session) {  //If user is not logged in redirect to login page
        res.render('View_recorded', { title: 'View Recorded Videos' });
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});


module.exports = router;