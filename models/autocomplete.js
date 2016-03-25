// var mongoose    =   require("mongoose");

// create instance of Schema
// var mongoSchema =   mongoose.Schema;

// create schema
// var userSchema  = {
//     "userEmail" : String,
//     "userPassword" : String
// };
// // create model if not exists.
// module.exports = mongoose.model('userLogin',userSchema);


// localhost
// 27017
AutoComplete = function (mongoose, connection, modelname) {
  var mongoSchema =   mongoose.Schema;
  var autocompleteSchema = new mongoSchema({
    name : {type: String, require: true, unique: true},
    count : Number,
    deviceids : [String],
    enable: Boolean,
    created_at : Date,
    updated_at : Date
  })

  // set 'create_at', 'updated_at' before save
  autocompleteSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) {
      this.created_at = currentDate
      this.enable = true
    }
    next()
  })


  this.Model = connection.model(modelname, autocompleteSchema);
}



AutoComplete.prototype.upsert = function(param, callback) {
  var _this = this
  var AutoCompleteModel = this.Model
  AutoCompleteModel.findOne({name: param.name}, function(err, data) {
    if (err) {
      callback(err, null)
    } else {
      if (data) {
        // update
        // AutoCompleteModel.findOne
        if (data.deviceids.indexOf(param.deviceid) < 0) {
          // increase count
          data.deviceids.push(param.deviceid)
          data.count = data.deviceids.length
          data.save(function(err) {
            callback(err, data)
          })
        } else {
          callback(err, data)
        }
      } else {
        // insert
        var autocompletedata = new AutoCompleteModel({
          name: param.name,
          count: 1,
          deviceids: [param.deviceid],
        })
        autocompletedata.save(function(err) {
          callback(err, autocompletedata)
        })
      }
    }
  });
}


AutoComplete.prototype.search = function(query, callback) {

  var limit = 8
  if (query.limit && query.limit < 50) {
    limit = query.limit
  } else if (query.limit && query.limit >= 50) {
    limit = 50
  }
  var param = {
    name: new RegExp(query.q, 'i'),
    enable: {$ne: false}
  }
  var selectquery = {
    name: 1,
    _id: 1,
    count: 1,
    created_at: 1,
    updated_at: 1
  }
  this.Model.find(param).sort({'count':-1}).select(selectquery).limit(limit).exec(callback)
}


module.exports = AutoComplete
