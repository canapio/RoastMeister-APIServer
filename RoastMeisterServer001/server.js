var express      =   require("express");
var app          =   express();
var bodyParser   =   require("body-parser");
// var mongoOp     =   require("./models/mongo");
var mongoose     =   require("mongoose");
var router       =   express.Router();
var AutoComplete =   require("./models/autocomplete")
// var site_vhosts  = []
// var vhost




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








//
// Authorization part
var authorizationKey = null
var mongoSchema =   mongoose.Schema;
var authorizationSchema = new mongoSchema({
  key : {type: String, require: true, unique: true},
  created_at: Date
})
var AuthorizationModel = connection.model("Authorization", authorizationSchema);
if (process.argv && process.argv.length>2) {
  AuthorizationModel.count({}, function(err, count) {
    authorizationKey = process.argv[2]
    if (count>0) {
      // error
      console.log("ERROR : Here was aleady set authenticaiton key.")
      process.exit(1);
    } else {
      // set key
      var keydocument = new AuthorizationModel({
        key: authorizationKey,
        created_at: new Date()
      })
      keydocument.save(function(err) {
        console.log("Success regist authorization key.")
      })
    }
  })
} else {
  AuthorizationModel.count({}, function(err, count) {
    if (count>0) {
      // ok
      AuthorizationModel.find({}, function(err, data) {
        authorizationKey = data[0].key
      })

    } else {
      // error
      console.log("ERROR : You must authenticaiton key at third argv.")
      console.log("ex) $ node server.js authenticaiton_key")
      process.exit(1);
    }
  })
}
//
//








app.use('/roastmeister001', function (req, res, next) {
  // console.log('Time: %d', Date.now());
  if (req.header('Authorization') && req.header('Authorization') == authorizationKey) {
    next();
  } else {
    response = {"error" : true, "message" : "Invalid Authorization Key."};
    res.json(response);
  }

});




var autocompleteTitles = ["nation", "farm", "beankind", "machine", "faul"]
var autocompltetDBs = {}
for (var i=0; i<autocompleteTitles.length; i++) {
  var title = autocompleteTitles[i]
  autocompltetDBs[title] = new AutoComplete(mongoose, connection, title)
}






// POST autocomplete
router.route("/roastmeister001/autocomplete")
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
router.route("/roastmeister001/autocomplete/:title")
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
      res.json(response)
  })




app.use('/',router);




// site_vhosts.push(express.vhost('rm.canapio.com', app));
// vhost = express().apply(this, site_vhosts);

app.listen(3000);
console.log("Listening to PORT 3000");
