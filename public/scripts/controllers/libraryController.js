//create a controller
myApp.controller( 'libraryController', [ '$scope', '$http', function( $scope, $http ){
  console.log( 'libraryController loaded' );
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
