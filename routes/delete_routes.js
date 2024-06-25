const express = require('express');
const router = express.Router();
const eyetower = require('../Classes/EyeTower');
const fs = require('fs');


router.delete('/User_P/:id', (req, res) => {
  const id = req.params.id;

  eyetower.removeUser(id)
    .then(result => {
      res.json({ redirect: '/List_users' });
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete('/Cam/:id', (req, res) => {
  const id = req.params.id;

  eyetower.removeCamera(id)
    .then(result => {
      res.json({ redirect: '/List_cameras' });
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete('/Person_P/:id', (req, res) => {
  const id = req.params.id;
  const person_dir = 'public\\photos\\' + req.query.photo_url.split('\\')[1]
  eyetower.removePerson(id)
    .then(result => {
      fs.readdir(person_dir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        fs.rm(person_dir, { recursive: true, force: true }, err => {
            if (err) {
              throw err;
            }
            //console.log(`${outputDir} is deleted!`);
          });
    });
      res.json({ redirect: '/List_persons' });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;