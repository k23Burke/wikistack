var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	models.Page.find({}, function(err, pages){
		res.render('index', { title:'Browse My Wikistack',docs: pages });
	});
 
});



module.exports = router;
