

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
      });
      // otherwise({
      //   redirectTo: "/home"
      // });
}]);


// myApp.controller('galleryController',['$scope', function($scope){
//   console.log('gallery loaded');
//
//
// }]); // end gallery controller
