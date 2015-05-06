var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/:tag', function(req, res, next) { // `/` look at app.js to see what that means.  Not starting at root directory but starting at root directory of routes/search
	var tag = req.params.tag;
	models.Page.find({tags :  {$elemMatch: {$in: [tag]}}}, function(err, data) {
		console.log("Here is the FOUND DATA:", data);
		res.render('index', {docs: data, title: 'Similar articles'});
	});
});


module.exports = router;