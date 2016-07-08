var mongoose = require('mongoose');  // require mongoose for mongo db
// var pagesArraySchema=require('../models/pagesArraySchema.js');
var Schema = mongoose.Schema;

var fa_issueSchema = new mongoose.Schema({  // set up new mongoose schema
  issue_number: Number,
  issue_name: String,
  issue_thumbnail: String,
  issue_pages: [{"default" : Schema.Types.Mixed  }]
});

// var pagesArraySchema = new mongoose.Schema({  // set up new mongoose schema
//   _id : { type: Number, ref: 'fa_issues' },
//   page_number: Number,
//   page_location: String,
//   page_thumbnail: String,
//   // issue_pages: panelsArraySchema
// });

var fa_issues = mongoose.model( 'fa_issues', fa_issueSchema );  // sets schema to model var
// var arrayPages = mongoose.model( 'arrayPages', pagesArraySchema );
// module.exports= arrayPages;
module.exports=fa_issues;
