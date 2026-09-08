const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

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
app.use('/', router);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Travlr Getaways app listening at http://localhost:${port}`);
});