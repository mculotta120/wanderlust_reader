console.log("client.js is sourced");

// create an ng app for the page
var myApp = angular.module( 'myApp', [] );
//create a controller
myApp.controller( 'LibraryController', [ '$scope', '$http', function( $scope, $http ){
    $scope.allIssues = [];
    event.preventDefault();
    $scope.getIssues = function(){  // gets current recordset upon button click
        $http({   // gets recordset via GET
          method: 'GET',
          url: '/getIssue',
        }).then( function( response ){  // success call - runs function with response parameter
          console.log(response);
            $scope.allIssues = response.data;  // pulls the data from app.js and sets to allTheRecords
          }, function myError( response ){
          console.log( response.statusText );
        }); //end .then
}; //end getIssues

$scope.addIssue = function(){ // adds issue on button click

  var objectToSend ={  // package object to send, with inputs
    issue_number: $scope.issueNumberBinder,
    issue_name: $scope.issueNameBinder,
    issue_thumbnail: $scope.issueThumbnailBinder,
    issue_pages: $scope.pagesBinder  // reference these in html
  }; //end objectToSend

  $http({  // sends object via POST
    method: 'POST',
    url: '/testPost',
    data: objectToSend
  }); //end $http

  $scope.issueNumberBinder =''; // clears input boxes
  $scope.issueNameBinder ='';
  $scope.issueThumbnailBinder = '';
  $scope.pagesBinder ='';
}; // end addIssue function



}]);  //end myApp controller
