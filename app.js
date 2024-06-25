const express = require('express');
const get_routes = require('./routes/get_routes');
const post_routes = require('./routes/post_routes');
const delete_routes = require('./routes/delete_routes');
const put_routes = require('./routes/put_routes');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const session = require('express-session');
const flash = require('connect-flash');
const eyetower = require('./Classes/EyeTower');

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
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

console.log()
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

// auth routes
app.use('/auth', authRoutes);

// upload routes
app.use('/upload', uploadRoutes);

// routes
app.use(get_routes);
app.use(post_routes);
app.use(delete_routes);
app.use(put_routes);

// redirects
app.get('/', (req, res) => {
    res.redirect('/Login');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

eyetower.findPersons();
const intervalInMinutes = 2;
setInterval(async () => {
    eyetower.findPersons();
}, intervalInMinutes * 60 * 1000);
