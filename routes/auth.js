const express = require('express');
const router = express.Router();
const eyetower = require('../Classes/EyeTower');

// Login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    eyetower.login(email, password)
        .then((results) => {
            if (results.length === 0) {
                req.flash('error-msg', 'Email or Password is incorrect');
                res.redirect('../Login');
            } else {
                req.session.loggedin = true;
                req.session.user = results[0];
                res.redirect('../User_H');
            }
        }).catch((error) => {
            console.log(error)
            req.flash('error-msg', 'Error logging in');
            res.redirect('../Login')
        })
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ redirect: '/Login' });
});

module.exports = router;