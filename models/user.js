var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	name : {type: String, required: true, index: true},
	username : {type: String, required: true},
	email : {type: String, required: true},
	password : {type: String, required: true},
});

module.exports = mongoose.model("users",userSchema);

//module.exports userModel;

//CRUD
module.exports.registerUser = function(newUser,callback){

	//Encoding Password
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}