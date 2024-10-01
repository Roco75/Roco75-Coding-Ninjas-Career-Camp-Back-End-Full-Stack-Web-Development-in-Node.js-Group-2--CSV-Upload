const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));


// Routes
const csvRoutes = require('./routes/csvRoutes');
app.use('/', csvRoutes);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
