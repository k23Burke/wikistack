var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

// creating new schema
var pageSchema = new mongoose.Schema({
  title:    String,
  url_name: String,
  owner_id: String,
  body:     String,
  date:     { type: Date, default: Date.now },
  status:   Number,
  tags: [String]
});

// virtuals to set and get URLs
pageSchema.virtual('full_route').get(function(){
	return "/wiki/" + this.url_name;
});

// pageSchema.virtual('full_route').set(function(newURL){
// 	this.url_name = newURL;
// });

var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

// converting them into object form
var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

// exporting them
module.exports = {
  Page: Page,
  User: User
};