var mongoose = require('mongoose');  // require mongoose for mongo db
var Schema = mongoose.Schema;

var fa_issueSchema = new mongoose.Schema({  // set up new mongoose schema
  issue_number: Number,
  issue_name: String,
  issue_thumbnail: String,
  issue_pages: [{"default" : Schema.Types.Mixed  }]
});


var fa_issues = mongoose.model( 'fa_issues', fa_issueSchema );  // sets schema to model var

module.exports=fa_issues;
