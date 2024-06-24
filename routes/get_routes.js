const express = require('express');
const router = express.Router();
const eyetower = require('../Classes/EyeTower');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos/');
    },
    filename: (req, file, cb) => {
        cb(null, 'temp' + file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase());
    }
})
const upload = multer({ storage: fileStorage });

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
            res.render('User_P', { title: 'User Profile', user: results[0], error: req.flash('error-msg'), success: req.flash('success-msg') });
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
        eyetower.viewAlerts().then((results) => {
            res.render('View_alerts', { title: 'Alerts', alerts: results });
        })
        
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
        const videosDirectory = path.join(__dirname, '../public/videos');
        fs.readdir(videosDirectory, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                res.status(500).send('Error reading directory');
                return;
            }

            const videos = files.map(file => {
                const startDate = file.split('_')[0].replaceAll('$',':');
                const endDate = file.split('_')[1].replaceAll('$',':');
                const cam = file.split('_')[2].replace('.webm','').replaceAll('$',':');
                const title = `${startDate} --> ${endDate} | Camera: ${cam}`;
                return { filePath: file, title: title};
            });
            console.log(videos);
            res.render('View_recorded', {title: 'View Recorded Videos',  videos: videos });
        });
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});

// Route to render the "Find Person" page
router.get('/Find_person', (req, res) => {
    if (req.session.loggedin == true) {  //If user is not logged in redirect to login page
        res.render('Find_person', { title: 'Find Person', person: null, logs: [], error: null});
    } else {
        req.flash('error-msg', 'You must login first');
        res.redirect('/Login')
    }
});


// Route to find person by name
router.get('/find_person/name', async (req, res) => {
    const name = req.query.name;
    try {
        const person = await eyetower.findPerson(name);
        if (person.length !== 0) {
            const logs = await eyetower.getPersonLogs(person[0].person_id);
            res.render('Find_person', { title: 'Find Person', person: person[0], logs: logs, error: null });
        } else {
            res.render('Find_person', { title: 'Find Person', person: null, logs: [], error: 'No person found with that name.' });
        }
    } catch (error) {
        console.error('Error finding person by name:', error);
        res.render('Find_person', { title: 'Find Person', person: null, logs: [], error: 'Internal server error.' });
    }
});

// Route to find person by photo
router.post('/find_person/photo', upload.single('photo'), async (req, res) => {
    const imagePath = path.join(__dirname, '../public/photos/', req.file.filename);
    try {
        const person = await eyetower.findPersonByPhoto(imagePath);
        if (person.length !== 0) {
            const logs = await eyetower.getPersonLogs(person[0].person_id);
            res.render('Find_person', { title: 'Find Person', person: person[0], logs: logs, error: null });
        } else {
            res.render('Find_person', { title: 'Find Person', person: null, logs: [], error: 'No person found with that photo.' });
        }
    } catch (error) {
        console.error('Error finding person by photo:', error);
        res.render('Find_person', { title: 'Find Person', person: null, logs: [], error: 'Internal server error.' });
    } finally {
        fs.unlink(imagePath, (unlinkError) => {
            if (unlinkError) {
                console.error(`Error deleting file ${imagePath}:`, unlinkError);
            }
        });
    }
});


module.exports = router;