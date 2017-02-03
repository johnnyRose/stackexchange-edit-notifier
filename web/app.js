var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var pug = require('pug');
var path = require('path');

var homeRoute = require('./routes/home.js');
var worker = require('../worker/worker');

// start background worker
worker.start();

// set the view engine to pug
app.set('view engine', 'pug');

// tell the app where to find the views
app.set('views', path.join(__dirname, '/views'));

// configure routes
app.use('/', homeRoute);

app.listen(port, function () {
   console.log(`Listening on port ${port}`);
});
