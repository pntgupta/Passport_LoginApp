
var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	exphbs = require('express-handlebars'),
	expressValidator = require('express-validator'),
	flash = require('connect-flash'),
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	//mongo = require('mongodb'),
	mongoose = require('mongoose');

//Routes
var routes = require('./routes/index'),
	users = require('./routes/users');

//Init App
var app = express();
app.listen("8000", function(){console.log("Listening to port 8000...");});

//Start Mongo Server
mongoose.connect("mongodb://localhost/loginApp");

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Cookie parser
app.use(cookieParser());

//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
app.use(flash());

//Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave:true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Static Content
app.use(express.static(path.join(__dirname,'public')));

//Global Variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Use Routes
app.use('/',routes);
app.use('/users',users);
