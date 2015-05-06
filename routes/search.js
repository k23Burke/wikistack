var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) { // `/` look at app.js to see what that means.  Not starting at root directory but starting at root directory of routes/search
	var searchStr = req.query.search;
	var arr = searchStr.split(" ");
	console.log("ARRRR:", searchStr);
	models.Page.find({tags :  {$elemMatch: {$in: arr}}}, function(err, data) {
		console.log("Here is the FOUND DATA:", data);
		res.render('index', {docs: data, title: 'Search Results', searchValue: searchStr});
	})
});


module.exports = router;

