var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	name : {type: String, required: true, index: true},
	username : {type: String, required: true},
	email : {type: String, required: true},
	password : {type: String, required: true},
});

var userModule = module.exports = mongoose.model("users",userSchema);

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

module.exports.getUserByUsername = function(userName,callback){
	userModule.findOne({username:userName},callback);
}
module.exports.getUserByID = function(userID,callback){
	userModule.findById(userID,callback);
}
module.exports.validatePassword = function(password,hash,callback){
	bcrypt.compare(password,hash,function(err,isMatch){
		if(err)
			throw err;
		else
			callback(null,isMatch)
	});
}