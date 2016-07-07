console.log("client.js is sourced");

// create an ng app for the page
var myApp = angular.module( 'myApp', ['ngRoute'] );
myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when("/home", {
          templateUrl: "views/pages/home.html",
          controller: "homeController"
      }).
      when("/library", {
        templateUrl: "/views/pages/library.html",
        controller: "LibraryController"
      }).
      when("/gallery", {
        templateUrl: "/views/pages/gallery.html",
        controller: "galleryController"
      }).
      when("/admin", {
        templateUrl: "/views/pages/admin.html",
        controller: "adminController"
      }).
      otherwise({
        redirectTo: "/home"
      });
}]);
//create a controller
myApp.controller( 'LibraryController', [ '$scope', '$http', function( $scope, $http ){
    $scope.allIssues = [];
    $scope.issueToView = [];
    event.preventDefault();

    $scope.getIssues = function(){  // gets current recordset upon button click
        $http({   // gets recordset via GET
          method: 'GET',
          url: '/getIssue',
        }).then( function( response ){  // success call - runs function with response parameter
          // console.log(response, "from GET");
            $scope.allIssues = response.data;  // pulls the data from app.js and sets to allTheRecords
          }, function myError( response ){
          console.log( response.statusText );
        }); //end .then
}; //end getIssues

$scope.openGalleryWindow = function(){
  var path = "#gallery";
  window.location.href=path;

  // galleryOpen(index);
};

$scope.galleryOpen = function(index){

  var issueObject = {
    id:$scope.allIssues[index]._id,
    number:$scope.allIssues[index].issue_number,
    name:$scope.allIssues[index].issue_name,
    pages:$scope.allIssues[index].issue_pages
  };
  console.log("issue object out: ", issueObject);
  $http({   // gets recordset via GET
    method: 'POST',
    url: '/galleryPost',
    data: issueObject
  }).then(function(response){
    $scope.issueToView = response.data;
    console.log(response, " is back from POST");
  }, function myError( response ){
    console.log(response.statusText);
  }); //end post
}; //end GalleryOpen

}]);  //end myApp controller LibraryController

myApp.controller('homeController',['$scope', function($scope){
  console.log('home loaded');

}]); // end home controller

myApp.controller('galleryController',['$scope', function($scope){
  console.log('gallery loaded');


}]); // end gallery controller

myApp.controller('adminController',[ '$scope', '$http', function( $scope, $http ){
  console.log('admin loaded');
  event.preventDefault();

  $scope.addedIssues = [];
  //put this in a module please.
  $scope.getIssues = function(){  // gets current recordset upon button click
      $http({   // gets recordset via GET
        method: 'GET',
        url: '/getIssue',
      }).then( function( response ){  // success call - runs function with response parameter
        // console.log(response, "from GET");
          $scope.addedIssues = response.data;  // pulls the data from app.js and sets to allTheRecords
        }, function myError( response ){
        console.log( response.statusText );
      }); //end .then
}; //end getIssues

  event.preventDefault();
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

event.preventDefault();
  $scope.updatePages = function(index){ // adds issue on button click

    var pageObjectToSend ={
      id:$scope.addedIssues[index]._id,
      page_number: $scope.pageNumberBinder,
      page_loction: $scope.pageLocationBinder,
      page_thumbnail: $scope.pageThumbnailBinder,
    }; //end objectToSend

    $http({  // sends object via POST
      method: 'POST',
      url: '/updatePagePost',
      data: pageObjectToSend
    }); //end $http

    $scope.pageNumberBinder =''; // clears input boxes
    $scope.pageLocationBinder ='';
    $scope.pageThumbnailBinder = '';
  }; // end addIssue function

}]); // end admin controller
