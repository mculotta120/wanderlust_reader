var express = require('express');  // require express
var app=express();
var path = require('path');  // sets up basic path
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var fa_issues=require('../models/fa_issueColl.js');  // requiring the assignments model
var mongoose = require('mongoose');  // require mongoose for mongo db

app.use( bodyParser.json() );

mongoose.connect('localhost:/wanderlustdb');

app.get( '/', function( req, res ){    // set basic url
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.use( express.static( 'public' ) );

app.listen( 8080, 'localhost', function( req, res ){ // spins up server
  console.log( 'listening on 8080' );
});

app.get( '/getIssue', function( req, res ){  // GET function to retrieve data
  fa_issues.find() // This is where the magic happens - all new and existing are found here
  .then( function( data ){  // similar to ajax get call - if found, then run function with data as parameter
    // console.log("data from app" + data);
    res.send( data );  // returns records as "data"
  });
});

app.post( '/testPost', function( req, res ){  // POST call
  var recordToAdd={  // adds record from input
    issue_number: req.body.issue_number,
    issue_name: req.body.issue_name,
    issue_thumbnail:req.body.issue_thumbnail,
    issue_pages: req.body.issue_pages
  };
  var newRecord=fa_issues( recordToAdd );  // saves record to database
  newRecord.save();
});
