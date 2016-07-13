var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Handles login form POST from login.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/'
    })
);

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/pages/login.html'));
});

module.exports = router;
