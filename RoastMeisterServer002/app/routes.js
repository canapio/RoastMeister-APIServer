
var express = require('express');
var fs = require('fs');
var sampledataobject = JSON.parse(fs.readFileSync('dist/sampledata/carlozdata.json', 'utf8'));
// console.log(sampledataobject)



module.exports = function(passport, connect) {
  var app = express()
  var router = express.Router();

  var autocompleteTitles = ["nation", "farm", "beankind", "machine", "faul"]
  var autocompleteModelMaker =   require("../app/models/autocomplete.js")
  var autocompleteModels = {}
  for (var i=0; i<autocompleteTitles.length; i++) {
    autocompleteModels[autocompleteTitles[i]] = autocompleteModelMaker(connect, autocompleteTitles[i])
  }




  router.get('/', function(req, res) {
    res.render('index.ejs');
  });
  router.get('/graphtest', function(req, res) {
    res.render('graphtest.ejs', {
      sampledata : sampledataobject
    });
  });
  router.route('/autocomplete/:title')
    .get(function(req, res) {
      if (autocompleteModels[req.params.title]) {
        console.log("before search db")
        autocompleteModels[req.params.title].find({}, function(err, data) {
          console.log("end search db")
          if (err) {
            res.render('autocomplete.ejs', {
              title : req.params.title,
              data : null,
              error : error
            });
          } else {
            res.render('autocomplete.ejs', {
              title : req.params.title,
              data : data,
              error : null
            });
          }
        })
      } else {
        res.render('page404.ejs')
      }

    });

  app.use('/',router);
  // app.get("/",function(req,res){
  //   res.json({"error" : false,"message" : "This is my server"});
  // });

  return app;
}
