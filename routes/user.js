var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');  // sets up basic path

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
  } else {
    // failure best handled on the server. do redirect here.
    // res.send(false);
    console.log('not logged in');
    res.redirect(301, '/');
    // res.send(false);
  }
});


module.exports = router;
