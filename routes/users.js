var router = require('express').Router(),
	user = require('../models/user.js');

router.get("/register",function(req,res){
	res.render('register');
});

router.get("/login",function(req,res){
	res.render('login');
});

//Register
router.post("/register",function(req,res){
	var name = req.body.name;
		username = req.body.username;
		email = req.body.email;
		password = req.body.password;
		password2 = req.body.password2;

	//Validations
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email not valid').isEmail();
	req.checkBody('password','Password is required').notEmpty();
	req.checkBody('password2','Password not matching').equals(password);

	var error = req.validationErrors();

	if(error)
		res.render("register",{errors:error});
	else{
		//Saving in Mongo DB
		var newUser = new user({name:name,username:username,email:email,password:password});

		user.registerUser(newUser,function(err,user){
			if (err)
				throw err;
		});

		req.flash('success', 'You are registered and can now login');
		res.location('/');
		res.redirect("/");
	}

})

router.get('/punit',function(req,res){
	req.flash("success_msg","aaaaaaaaaaaaaaaa");
	res.redirect("/");
})




module.exports = router;