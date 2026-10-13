
require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
require('./app_api/config/passport');

// Connect to MongoDB
require('./app_api/models/db');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Allow CORS requests from the Angular admin site
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
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

// Handle authentication and server errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Unauthorized: valid authentication token required.'
        });
    }

    console.error(err.stack || err);

    return res.status(err.status || 500).json({
        message: 'An unexpected server error occurred.'
    });
});

app.listen(port, () => {
    console.log(`Travlr Getaways app listening at http://localhost:${port}`);
});
