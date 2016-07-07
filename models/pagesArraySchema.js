var mongoose = require('mongoose');  // require mongoose for mongo db
// var panelsArraySchema=require('../models/panelsArraySchema.js');
var Schema = mongoose.Schema;

var pagesArraySchema = new mongoose.Schema({  // set up new mongoose schema
  page_number: Number,
  page_location: String,
  page_thumbnail: String,
  // issue_pages: panelsArraySchema
});

var arrayPages = mongoose.model( 'arrayPages', pagesArraySchema );  // sets schema to model var

module.exports=arrayPages;
