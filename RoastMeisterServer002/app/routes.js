module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });
  // app.get("/",function(req,res){
  //   res.json({"error" : false,"message" : "This is my server"});
  // });
  
}
