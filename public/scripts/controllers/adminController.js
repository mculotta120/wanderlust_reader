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
