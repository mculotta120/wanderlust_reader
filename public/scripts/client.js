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
        controller: "libraryController"
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
myApp.controller( 'libraryController', [ '$scope', '$http', function( $scope, $http ){
    $scope.allIssues = [];
    $scope.issueToView = [];
    $scope.currentPageIndex = 0;
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

    // $scope.openGalleryWindow = function(index){
    //   var path = "#gallery";
    //   window.location.href=path;
    //
    // $scope.galleryOpen(index);
    // };

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
        url: '/chooseIssue',
        data: issueObject
      });
      var path = "#gallery";
      window.location.href=path;
    }; //end chooseIssue

  $scope.PagesBack = function(){
    $http({
      method:'GET',
      url: '/pages'
    }).then(function(response){
      $scope.issueToView = response.data[0].pages;
      $scope.currentPage = $scope.issueToView[$scope.currentPageIndex];
      console.log(response.data[0].pages, "response.data[0].pages");
      console.log(response.data[0].pages[0].page_location);
      // $scope.issueToView = response.config.data.pages[0];
      // console.log("page number: ", response.config.data.pages[0].page_number, "page location: ", response.config.data.pages[0].page_location, " is back from POST");
    }, function myError( response ){
      console.log(response.statusText);
    }); //end post
    }; //end GalleryOpen

    $scope.nextPage = function(){
      console.log("next clicked");
      $scope.currentPageIndex++;
      console.log( $scope.currentPageIndex );
      $scope.PagesBack();
    };
    $scope.prevPage = function(){
    console.log("prev clicked");
      $scope.currentPageIndex--;
      $scope.PagesBack();
    };

    }]);  //end myApp controller LibraryController

myApp.controller('homeController',['$scope', '$http', function($scope, $http){
  console.log('home loaded');

}]); // end home controller

myApp.controller('galleryController',['$scope', function($scope){
  console.log('gallery loaded');


}]); // end gallery controller

myApp.controller('adminController',[ '$scope', '$http', function( $scope, $http ){
  console.log('admin loaded');
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
}]); // end admin controller
