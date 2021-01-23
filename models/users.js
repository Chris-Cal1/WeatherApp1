var mongoose = require('./connection');

var userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    
   });

   var UserModel = mongoose.model('users', userSchema);
  



    module.exports = UserModel;