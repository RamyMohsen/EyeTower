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
  const photo_url = 'public\\' + req.query.photo_url;
  eyetower.removePerson(id)
    .then(result => {
      if (fs.existsSync(photo_url)) {
        fs.unlink(photo_url, (err) => {
          if (err) throw err;
          console.log('File deleted!');
        })
      } else {
        console.log('File not present');
      }
      res.json({ redirect: '/List_persons' });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;