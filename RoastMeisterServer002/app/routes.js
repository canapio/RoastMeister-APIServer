
var express = require('express');



module.exports = function(passport) {
  var app = express.Router();

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });
  // app.get("/",function(req,res){
  //   res.json({"error" : false,"message" : "This is my server"});
  // });

  return app;
}
