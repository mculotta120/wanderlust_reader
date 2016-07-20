var express = require('express');  // require express
var app=express();
var path = require('path');  // sets up basic path
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var fa_issues=require('../models/fa_issueColl.js');  // requiring the fa_issueColl model
var mongoose = require('mongoose');  // require mongoose for mongo db

var passport = require('../strategy/userStrategy');
var session = require('express-session');

// Routes
var index = require('../routes/index');
var user = require('../routes/user');
var register = require('../routes/register');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static( 'public'));
// console.log(__dirname, '/public');
// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Mongo Connection //
// mongoose.connect('localhost:/wanderlustdb');
var mongoURI = "mongodb://reader:comics123@ds023495.mlab.com:23495/wanderlustdb";
console.log("1");
var mongoDB = mongoose.connect(mongoURI).connection;
console.log("2");

mongoDB.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo");
});

// app.get( '/', function( req, res ){    // set basic url
//   res.sendFile( path.resolve( 'views/index.html' ) );
// });

app.listen( process.env.Port|| 8080, 'localhost', function( req, res ){ // spins up server
  console.log( 'listening on 8080' );
});

app.get( '/getIssue', function( req, res ){  // GET function to retrieve Issues
  fa_issues.find()
  .then( function( data ){
    res.send( data );  // returns records as "data"
  });
});

//adds issue to wanderlustdb  fa_issues
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

app.post( '/chooseIssue', function( req, res ){  // POST call
  selectedIssue = [];
  var displayIssueObject = {
    id:req.body.id,
    number:req.body.number,
    name:req.body.name,
    pages:req.body.pages
  };
  // console.log("here is ",displayIssueObject.pages);
  fa_issues.findOne({_id:req.body.id}, function(err, issueResult){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
    // console.log(req.body.id, " found.", req.body.pages, "available");
    selectedIssue.push(displayIssueObject);
    console.log("selectedIssue", selectedIssue);
    res.sendStatus(200);
    }
  }); //end post chooseIssue

}); //end gallery post
// console.log(selectedIssue, "between post and get");

app.get('/pages', function( req, res ){
console.log("I'm sending ", selectedIssue, " back to you.");
  return res.json(selectedIssue);
}); // end /pages get

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/*', index);
