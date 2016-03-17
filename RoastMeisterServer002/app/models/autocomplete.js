var mongoose = require("mongoose")

module.exports = function(connect, title) {
  var autocompleteSchema = new mongoose.Schema({
      name : {type: String, require: true, unique: true},
      count : Number,
      deviceids : [String],
      created_at : Date,
      updated_at : Date
  })
  autocompleteSchema.pre('save', function(next) {
      var currentDate = new Date()
      this.updated_at = currentDate
      if (!this.created_at) {
        this.created_at = currentDate
      }
      next()
  })

  return connect.model(title, autocompleteSchema);
}
