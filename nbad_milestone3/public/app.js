var express = require('express');
var path =require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var app = express();

let ProfileController = require('./routes/profile_Controller');
let Controller = require('./routes/controller');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname);
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(session({secret:'sb', resave: false, saveUninitialized: false})); //Initialize session

app.use('*/assets',express.static(path.join(__dirname, 'assets')));

app.use('/', Controller);
app.use('/',ProfileController);
// app.use('/newConnection',Controller);
// app.use('/connections',Controller);
// app.use('/:connection_ID', Controller);
// app.use('/savedconnections',Controller);
// app.use('/about',Controller);
// app.use('/contact',Controller);
// app.use('/logout',Controller);


module.exports = app;

app.listen(3000, () => console.log(`Example app listening on port 3000!`))