
var express = require('express');
var fs = require('fs');
var dateFormat = require('dateformat');
var sampledataobject = JSON.parse(fs.readFileSync('dist/sampledata/carlozdata.json', 'utf8'));
// console.log(sampledataobject)



module.exports = function(passport, connect) {
  var app = express()
  var router = express.Router();

  var apiTitles = ["countrys", "provinces-districts", "varieties", "machines", "fauls"]
  var autocompleteTitles = ["nation", "farm", "beankind", "machine", "faul"]
  var autocompleteModelMaker =   require("../app/models/autocomplete.js")
  var autocompleteModels = {}
  for (var i=0; i<autocompleteTitles.length; i++) {
    autocompleteModels[autocompleteTitles[i]] = autocompleteModelMaker(connect, autocompleteTitles[i])
  }

  // LOGIN ==============================
  // router.get('/login', isLoggedIn, function(req, res) {
  //   res.render('login.ejs');
  // });
  // LOGOUT ==============================
  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  // MAIN PAGE ==============================
  router.get('/', isLoggedIn, function(req, res) {
    res.render('index.ejs');
  });

  router.get('/graphtest', function(req, res) {
    res.render('graphtest.ejs', {
      sampledata : sampledataobject
    });
  });
  router.route('/autocomplete/:title')
    .get(isLoggedIn, function(req, res) {
      if (apiTitles.indexOf(req.params.title) >= 0 && autocompleteModels[autocompleteTitles[apiTitles.indexOf(req.params.title)]]) {
        var dbtitle = autocompleteTitles[apiTitles.indexOf(req.params.title)]
        autocompleteModels[dbtitle].find({}, function(err, data) {
          if (err) {
            res.render('autocomplete.ejs', {
              title : dbtitle,
              data : null,
              error : error
            });
          } else {
            // for (var i=0; i<data.length; i++) {data[i]["created_at"] = dateFormat(data[i]["created_at"], "yyyy/mm/dd HH:MM:ss"); data[i]["updated_at"] = dateFormat(data[i]["updated_at"], "yyyy/mm/dd HH:MM:ss");}
            res.render('autocomplete.ejs', {
              title : dbtitle,
              data : data,
              error : null
            });
          }
        })
      } else {
        res.render('page404.ejs')
      }

    });







// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', isLoggedIn, function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/',
                failureRedirect : '/login'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
              successRedirect : '/',
              failureRedirect : '/login'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
              successRedirect : '/',
              failureRedirect : '/login'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
              successRedirect : '/',
              failureRedirect : '/login'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
              successRedirect : '/',
              failureRedirect : '/login'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
              successRedirect : '/',
              failureRedirect : '/login'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

  app.use('/',router);

  return app;
}


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.url.indexOf("/login") != -1) {
          // 로그인 했는데 로그인 페이지로 가고싶어하면, 메인페이지로 띄우기
          res.redirect('/');
        } else {
          if (req.url=="/" && req.session.returnTo) {
            var returnTo = req.session.returnTo
            delete req.session.returnTo;
            res.redirect(returnTo || '/');
          } else {
            return next();
          }
        }
    } else {
      // 로그인 안했을시에만 로그인 페이지로가기
      if (req.url.indexOf("/login") != -1) {
        next()
      } else {
        req.session.returnTo = req.path;
        res.redirect('/login');
      }
    }


}
