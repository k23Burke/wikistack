var express = require('express');
var router = express.Router();
var models = require('../models/index');
// var passport = require('passport');


router.get('/', function(req, res){
	res.render('register');
});


router.post('/', function(req, res, next) { // `/` look at app.js to see what that means.  Not starting at root directory but starting at root directory of routes/search
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	var user = new models.User({
		name: {
			first: firstname,
			last: lastname
		},
		email: email,
		username: username,
		password: password
	});
	user.save(function(err, succ){
		res.redirect('/');
	});
});


module.exports = router;
