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
      });
      // otherwise({
      //   redirectTo: "/home"
      // });
}]);
//create a controller
myApp.controller( 'libraryController', [ '$scope', '$http', function( $scope, $http ){
    $scope.allIssues = [];
    $scope.issueInfo = [];
    $scope.issueToView = [];
    $scope.panelToView = [];
    $scope.imageMaps = [];
    $scope.currentPageIndex = 0;
    $scope.currentPanelIndex= 0;

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


    $scope.galleryOpen = function( index ){
      var issueObject = {
        id:$scope.allIssues[index]._id,
        number:$scope.allIssues[index].issue_number,
        name:$scope.allIssues[index].issue_name,
        pages:$scope.allIssues[index].issue_pages
      };
      $scope.currentPageIndex = index;
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
      $scope.issueInfo = response.data[0];
      $scope.currentPage = $scope.issueToView[$scope.currentPageIndex];
      $scope.imageMaps = $scope.currentPage.page_coordinates[$scope.currentPageIndex];
      $scope.panelToView = $scope.currentPage.page_panels;
      $scope.currentPanel = $scope.panelToView[$scope.currentPanelIndex];
      $scope.commentVar = $scope.currentPanel.panel_comment;
      console.log($scope.imageMaps.click, $scope.imageMaps.coords, $scope.imageMaps.altText, "test");
      // console.log($scope.currentPage.page_panels[0].panel_location, " is the currentPage first panel");
      // console.log($scope.currentPage, "currentPage");
      // console.log(response.data[0].pages, "response.data");
      // $scope.issueToView = response.config.data.pages[0];
      // console.log("page number: ", response.config.data.pages[0].page_number, "page location: ", response.config.data.pages[0].page_location, " is back from POST");
    }, function myError( response ){
      console.log(response.statusText);
    }); //end post
    }; //end GalleryOpen


    $scope.nextPage = function(){
      console.log("next clicked");
      $scope.currentPageIndex++;
      if( $scope.currentPageIndex == $scope.issueToView.length ){
        $scope.currentPageIndex = 0;
      }
      console.log( $scope.currentPageIndex );
      $scope.PagesBack();
    };// end nextPage
    $scope.prevPage = function(){
    console.log("prev clicked");
      $scope.currentPageIndex--;
      if( $scope.currentPageIndex === -1 ){
        $scope.currentPageIndex = 0;
      }
      $scope.PagesBack();
    }; //end prevPage

    $scope.thumbnailPageOpen = function( index ){
      $scope.currentPageIndex = index;
      $scope.PagesBack();
    }; //end thumbnailPageOpen

    $scope.nextPanel = function(){
      $scope.currentPanelIndex++;
      if($scope.currentPanelIndex === $scope.panelToView.length){
        $scope.nextPage();
        $scope.currentPanelIndex = 0;
      }
      $scope.PagesBack();
    }; // end nextPanel

    $scope.prevPanel = function(){
      $scope.currentPanelIndex--;
      if($scope.currentPanelIndex === -1){
        $scope.currentPanelIndex = $scope.panelToView.length - 1;
        $scope.prevPage();
        console.log($scope.currentPanelIndex, "nextbutton");
      }
      $scope.PagesBack();
    }; // end nextPanel

    $scope.thumbnailPanelOpen = function( index ){
      $scope.currentPanelIndex = index;
      console.log($scope.currentPanelIndex);
      $scope.PagesBack();
    }; //end thumbnailPanelOpen

    $scope.toggle = function() {
        $scope.commentText = !$scope.commentText;
    };

    }]);  //end myApp controller LibraryController

    myApp.directive('modalDialog', function(  ) {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

myApp.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function( ) {
    $scope.modalShown = !$scope.modalShown;
  };
  $scope.openModal = function(number){
    $scope.currentPanelIndex = number ;
    console.log($scope.currentPanelIndex);
    $scope.PagesBack();
    $scope.toggleModal();
  }; // end openModal


}]);

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
