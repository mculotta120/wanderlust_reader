var passport = require('passport');
var localStrategy = require( 'passport-local').Strategy;
var user = require('../models/user');

//serialize
passport.serializeUser(function(user, done){  //pack
  console.log('serialized: ', user);
  done(null, user.id);
});

//deserialize
passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user) {
    if(err) {
      done(err);
    }

    console.log('deserialized: ', user);
    done(null, user);
  });
});
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    // mongoose stuff
    user.findOne({username: username}, function(err, user) {
      if(err) {
        throw err;
      }

      if(!user) {
        // user not found
        return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // found user! Now check their given password against the one stored in the DB
        user.comparePassword(password, function(err, isMatch) {
          if(err) {
            throw err;
          }

          if(isMatch) {
            // all good, populate user object on the session through serializeUser
            return(done(null, user));
          } else {
            // no good.
            done(null, false, {message: 'Incorrect credentials.'});
          }
        });
      } // end else
    }); // end findOne
  } // end callback
));

module.exports = passport;
