
var express = require('express');
var fs = require('fs');
var sampledataobject = JSON.parse(fs.readFileSync('dist/sampledata/carlozdata.json', 'utf8'));
// console.log(sampledataobject)

module.exports = function(passport) {
  var app = express.Router();

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });
  app.get('/graphtest', function(req, res) {
    res.render('graphtest.ejs', {
      sampledata : sampledataobject
    });
  });
  app.get('/autocomplete', function(req, res) {
    res.render('autocomplete.ejs', {
      sampledata : sampledataobject
    });
  });
  // app.get("/",function(req,res){
  //   res.json({"error" : false,"message" : "This is my server"});
  // });

  return app;
}
