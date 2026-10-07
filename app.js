const express = require('express');
const path = require('path');

// Connect to MongoDB
require('./app_api/models/db');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow CORS requests from the Angular admin site
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// Set up Handlebars
const { engine } = require('express-handlebars');

// Set up views and Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Routes
const router = require('./app_server/routes');
const apiRouter = require('./app_api/routes');

app.use('/', router);
app.use('/api', apiRouter);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Travlr Getaways app listening at http://localhost:${port}`);
});