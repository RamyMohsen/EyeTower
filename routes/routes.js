const express = require('express');
const router = express.Router();

// Routes
router.get('/Add_person', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('Add_person', { title: 'Add Person' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
                
  
router.get('/Add_user', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('Add_user', { title: 'Add User' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});      

router.get('/Find', (req, res) => {
    console.log(req.session)
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('Find', { title: 'Find Person' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/List_persons', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('List_persons', { title: 'List All Persons' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/List_users', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('List_users', { title: 'List All Users' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/Login', (req, res) => {
    res.render('Login', { title: 'Login', msg:req.flash('error-msg') }); 
});
            

router.get('/Person_P', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('Person_P', { title: 'Person Profile' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/User_P', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('User_P', { title: 'User Profile' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/User_H', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('User_H', { title: 'Home', user: req.session.user});
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/View_live', (req, res) => {
    if(req.session.loggedin == true){  //If user is not logged in redirect to login page
        res.render('View_live', { title: 'View Live Feed' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});
            

router.get('/View_recorded', (req, res) => {
    if(req.session){  //If user is not logged in redirect to login page
        res.render('View_recorded', { title: 'View Recorded Videos' });
    }else{
        req.flash('error-msg','You must login first');
        res.redirect('/Login')
    }
});


module.exports = router;