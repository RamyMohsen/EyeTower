const express = require('express');
const db = require('./Classes/Database')
const get_routes = require('./routes/get_routes');
const post_routes = require('./routes/post_routes');
const delete_routes = require('./routes/delete_routes');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const flash = require('connect-flash');

// express app
const app = express();
app.use(
    session({
      secret: 'e43c15bc46379fa89145cf96256ff190a13c4234404f733704561d75b748c9c5',
      resave: false,
      saveUninitialized: true
    })
  );
// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// auth routes
app.use('/auth', authRoutes);

// routes
app.use(get_routes);
app.use(post_routes);
app.use(delete_routes);

// redirects
app.get('/', (req, res) => {
    res.redirect('/Login');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

