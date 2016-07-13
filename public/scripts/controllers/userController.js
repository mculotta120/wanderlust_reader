myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.userName;

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $window.location.href = '/success.html';
        }
    });
}]); //end UserController
