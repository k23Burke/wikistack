var marked = require('marked');

module.exports = function(swig) {
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='"+doc.full_route+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  swig.setFilter('page_link', page_link);

  var page_linkEdit = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='"+doc.full_route+"/edit'>Edit "+link_name+"</a>";
  };
  page_linkEdit.safe = true;

  swig.setFilter('page_linkEdit', page_linkEdit);





  var markdown = function(text){
    return marked(text);
  }
  markdown.safe = true;
  swig.setFilter('markdown', markdown);
};

