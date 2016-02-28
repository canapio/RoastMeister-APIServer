var express      =   require("express");
var app          =   express();
var bodyParser   =   require("body-parser");
// var mongoOp     =   require("./models/mongo");
var mongoose     =   require("mongoose");
var router       =   express.Router();
var AutoComplete =   require("./models/autocomplete")


var connection = mongoose.connect('mongodb://localhost:27017/roastmeister001')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));

router.get("/",function(req,res){
  res.json({"error" : false,"message" : "Wooooooooooooooooooooooooooo"});
});










// check require params
var checkRequireParams = function(target, requirments) {
  if (requirments == null) {return null}
  var returnMessage = ""
  for (var i=0; i<requirments.length; i++) {
    if (target == null || target[requirments[i]] == null) {
      if (i==0) {returnMessage += requirments[i]
      } else {returnMessage += ", " + requirments[i]}
    }
  }
  if (returnMessage.length == 0) {
    return null
  } else {
    return returnMessage
  }
}















var autocompleteTitles = ["nation", "farm", "beankind", "machine", "faul"]
var autocompltetDBs = {}
for (var i=0; i<autocompleteTitles.length; i++) {
  var title = autocompleteTitles[i]
  autocompltetDBs[title] = new AutoComplete(mongoose, connection, title)
}






// POST autocomplete
router.route("/autocomplete")
  .post(function(req,res){
    var checkedRequireParams = checkRequireParams(req.body, ["deviceid"])
    var deviceid = req.body.deviceid
    if (deviceid != null) {
      upsertAutocompleteWithCallback(req.body, 0, {upsert: 0, error: 0}, function(err, response) {
        var response = {"error" : false, "message": "success", "data" : response};
        res.json(response)
      })
    } else {
      var response = {"error" : true, "err_code" : 501, "message" : "Invalid params. Require [" + checkedRequireParams + "] params."};
      res.json(response)
    }
  });

function upsertAutocompleteWithCallback (params, i, response, callback) {
  if (i==autocompleteTitles.length) {
    callback(null, response)
    return
  }
  var title = autocompleteTitles[i]
  if (params[title] == null) {
    upsertAutocompleteWithCallback(params, i+1, response, callback)
    return
  }
  // 재귀 호출
  autocompltetDBs[autocompleteTitles[i]].upsert({name: params[autocompleteTitles[i]], deviceid: params.deviceid}, function(err, data) {
    if (err) {
      response.error += 1
    } else {
      response.upsert += 1
    }
    upsertAutocompleteWithCallback(params, i+1, response, callback)
  })
}

// GET autocompletes
router.route("/autocomplete/:title")
  .get(function(req,res){
      for (var i=0; i<autocompleteTitles.length; i++) {
        if (autocompleteTitles[i] == req.params.title) {
          var title = autocompleteTitles[i]
          var param = {}
          if (req.params.q) {param.name = req.params.q}

          autocompltetDBs[title].search(req.query, function(err, data) {
            var response
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = {"error" : false, "message": "success", "data" : data};
            }
            res.json(response);
          })
          return
        }
      }
      var response = {"error" : true, "message" : "you cannnot use '" + req.params.title + "'db."}
      res.json(response);
      return

      console.log(req.params.id)
      mongoOp.findById(req.params.id,function(err, data){
      // This will run Mongo Query to fetch data based on ID.
          if(err) {
              response = {"error" : true,"message" : "Error fetching data"};
          } else {
              response = {"error" : false,"message" : data};
          }
          res.json(response);
      });
  })




app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
