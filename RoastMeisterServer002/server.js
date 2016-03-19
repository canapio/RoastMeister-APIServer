var express      =   require("express");
var app          =   express();


var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var ConnectRoles = require('connect-roles');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// var router       =   express.Router();

var configDB = require('./config/database.js');

// configuration ===============================================================
var connect = mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating


// Connect-Roles
var user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {action: action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// required for connect-roles
app.use(user.middleware());


app.use('/', require('./app/routes.js')(passport, connect))
app.use('/dist', require('./app/static.js')())

// app.use(express.static('public'));
// app.use('/',router);






// site_vhosts.push(express.vhost('rm.canapio.com', app));
// vhost = express().apply(this, site_vhosts);

app.listen(8000).on('error', function(err) {
  console.log(err)
});
