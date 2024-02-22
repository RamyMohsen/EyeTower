const express = require('express');
const mysql = require('mysql');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/Add_person', (req, res) => {
  res.render('Add_person', { title: 'Add Person' });
});
              

app.get('/Add_user', (req, res) => {
  res.render('Add_user', { title: 'Add User' });
});
              

app.get('/Admin_H', (req, res) => {
  res.render('Admin_H', { title: 'Home' });
});
              

app.get('/Find', (req, res) => {
  res.render('Find', { title: 'Find Person' });
});
              

app.get('/List_persons', (req, res) => {
  res.render('List_persons', { title: 'List All Persons' });
});
              

app.get('/List_users', (req, res) => {
  res.render('List_users', { title: 'List All Users' });
});
              

app.get('/Login', (req, res) => {
  res.render('Login', { title: 'Login' });
});
              

app.get('/Modify_person', (req, res) => {
  res.render('Modify_person', { title: 'Modify Person' });
});
              

app.get('/Modify_user', (req, res) => {
  res.render('Modify_user', { title: 'Modify User' });
});
              

app.get('/User_H', (req, res) => {
  res.render('User_H', { title: 'Home' });
});
              

app.get('/View_live', (req, res) => {
  res.render('View_live', { title: 'View Live Feed' });
});
              

app.get('/View_recorded', (req, res) => {
  res.render('View_recorded', { title: 'View Recorded Videos' });
});

// redirects
app.get('/', (req, res) => {
  res.redirect('/Login');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});