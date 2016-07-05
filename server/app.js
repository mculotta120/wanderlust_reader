var express = require('express');
var app = express();
var path=require('path');
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url


//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});
