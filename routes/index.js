var router = require('express').Router();

router.get('/',ensureAuthenticated,function(req,res){
	res.render('index');
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated())
		return next();
	else
		req.flash("error_msg",'Please login to continue');
		res.redirect("/users/login");
}

module.exports = router;