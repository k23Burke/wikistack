var express = require('express');
var router = express.Router();
var models = require('../models/index');
var passport = require('passport');


router.get('/', function(req, res){
	res.render('login');
});


// router.post('/', function(req, res, next) { // `/` look at app.js to see what that means.  Not starting at root directory but starting at root directory of routes/search
// 	console.log("ARE WE INSIDE???");
// 	var username = req.body.username;
// 	var password = req.body.password;
// 	passport.authenticate('local', { successRedirect: '/',
// 									 failureRedirect: '/login',
// 									 failureFlash: true });
// 	// models.User.find({username: username, password: password}, function(err, data) {
// 	// 	console.log("Here is the FOUND DATA:", data);
// 	// 	res.render('index', {docs: data, title: 'Search Results', searchValue: searchStr});
// 	// })
// });
router.post('/', passport.authenticate('local', { successRedirect: '/',
									 failureRedirect: '/login',
									 failureFlash: true })
	// models.User.find({username: username, password: password}, function(err, data) {
	// 	console.log("Here is the FOUND DATA:", data);
	// 	res.render('index', {docs: data, title: 'Search Results', searchValue: searchStr});
	// })
);


module.exports = router;
