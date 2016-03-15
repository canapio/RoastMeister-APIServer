var express      =   require("express");
var app          =   express();
var bodyParser   =   require("body-parser");


var router       =   express.Router();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));

router.get("/",function(req,res){
  res.json({"error" : false,"message" : "Wooooooooooooooooooooooooooo"});
});



app.use('/',router);




// site_vhosts.push(express.vhost('rm.canapio.com', app));
// vhost = express().apply(this, site_vhosts);

app.listen(8000);
console.log("Listening to PORT 8000");
