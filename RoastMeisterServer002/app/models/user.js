// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        photourl     : String,
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        photourl     : String,
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        photourl     : String,
    },
    /*
    Admin    : 루트 유저,
    Monitor  : 관리자,
    Anonymous: 일반 유저,
    */
    group            : String,
    created_at       : Date,
    updated_at       : Date,
});



// index가 높아질수록 높은 권한을 가짐
userSchema.methods.groups = function() {
  return [
    "Anonymous",    // 일반 유저
    "Monitor",      // 관리자
    "Admin",        // 루트 유저
  ];
}

// checking group
userSchema.methods.canGroup = function(targetGroup) {
  var targetGroupIndex = this.groups().indexOf(targetGroup);
  var thisGroupIndex = this.groups().indexOf(this.group);
  if (targetGroupIndex <= thisGroupIndex) return true;
  else return false
};
userSchema.methods.isGroup = function(targetGroup) {
  return targetGroup == this.group;
};




userSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) {
      this.created_at = currentDate
    }
    if (!this.group) {
      this.group = "Anonymous"
    }
    next()
})

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};




// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
