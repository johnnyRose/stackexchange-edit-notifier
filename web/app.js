var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var homeRoute = require('./routes/home.js');
var worker = require('../worker/worker');

app.use(express.static(path.join(__dirname, 'content')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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




var helper = require('sendgrid').mail;
var from_email = new helper.Email('stack-alerts@johnrosewicz.com', 'StackAlerts');
var to_email = new helper.Email('jmr1792@yahoo.com');
var subject = "Post Edited on Stack Overflow";
var content = new helper.Content('text/html', "<p>Hey there! <br /><br />Looks like your post has been edited.</p>");
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
console.log(__dirname);
