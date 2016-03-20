var express      =   require("express");
var app          =   express();


var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// var router       =   express.Router();

var configDB = require('./config/database.js');

// configuration ===============================================================
var connect = mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration



/*check server has root account*/
var userModel = require("./app/models/user.js")
userModel.count({group: "Admin"}, function(err, count) {
  if (err || count == 0) {
    // check pocess param
    if (process.argv && process.argv.length>3) {
      var userpass0 = process.argv[2]
      var userpass1 = process.argv[3]
      if (userpass0 != userpass1) {
        console.error("ERROR : Please check {ADMIN PASSWORD CONFIRM}.")
        process.exit(1);
      }
      var userid = "admin"
      var userpass = userpass0
      var adminuser = new userModel()
      adminuser.local.email     = userid,
      adminuser.local.password  = adminuser.generateHash(userpass)
      adminuser.group           = "Admin"

      adminuser.save(function(err) {
        if (err) {
          console.err("Failed to make admin : " + err)
        } else {
          console.log("Success to make admin")
        }
      })
    } else {
      // error
      console.error("ERROR : There is no root account. \nPlease command $ node server.js {ADMIN PASSWORD} {ADMIN PASSWORD CONFIRM}. \nThen you can use root account(ID:root, pass:{ADMIN PASSWORD}).")
      process.exit(1);
    }
  }
})



app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating




// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



app.use('/', require('./app/routes.js')(passport, connect))
app.use('/dist', require('./app/static.js')())

// app.use(express.static('public'));
// app.use('/',router);






// site_vhosts.push(express.vhost('rm.canapio.com', app));
// vhost = express().apply(this, site_vhosts);

app.listen(8000).on('error', function(err) {
  console.log(err)
});
