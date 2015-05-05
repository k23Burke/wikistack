var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET users listing. */
router.get('/:artName', function(req, res, next) {
	var artN = req.params.artName;
	models.Page.find({url_name : artN}, function(err, data) {
		// console.log(data);
		res.render('wiki', {article: data[0]});
		//res.send('HERE');
	})
});

router.get('/:artName/edit', function(req, res){
	var artN = req.params.artName;
	models.Page.find({url_name : artN}, function(err, data) {
		// console.log(data);
		res.render('edit', {article: data[0]});
	});
});

router.post('/:artName/edit', function(req, res){
	// var artN = req.params.artName
	var id = req.body.id;
	// console.log(id);
	var body = req.body.content;
	var title = req.body.title;
	var url = generateUrlName(title);
	models.Page.findOne({_id: id}, function(err, doc){
		console.log('THE DOC', doc);
		doc.title = title;
		doc.body = body;
		doc.url_name = url;
		doc.save(function(err, doc){
			res.redirect('/wiki/'+url);
		});
	});
	// models.Page.update({id: id}, { $set: {body: body, title: title, url_name: url }}, {multi: false}, function(err, doc){
	// 	console.log(doc);
	// 	res.redirect('/' + url);
	// });

});

var generateUrlName = function(name) {
  if (typeof name != "undefined" && name !== "") {
    // Removes all non-alphanumeric characters from name
    // And make spaces underscore
    return name.replace(/\s/ig, '_').replace(/\W/ig,'');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2,7);
  }
};





module.exports = router;
