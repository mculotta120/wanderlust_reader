

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
        controller: "libraryController"
      }).
      when("/admin", {
        templateUrl: "/views/pages/admin.html",
        controller: "adminController"
      }).
      otherwise({
        redirectTo: "/library"
      });
}]);

// myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
//     $scope.userName;
//
//     // This happens after page load, which means it has authenticated if it was ever going to
//     // NOT SECURE
//     $http.get('/user').then(function(response) {
//         if(response.data.username) {
//             $scope.userName = response.data.username;
//             console.log('User Data: ', $scope.userName);
//         } else {
//             $window.location.href = '/success.html';
//         }
//     });
// }]); //end UserController
