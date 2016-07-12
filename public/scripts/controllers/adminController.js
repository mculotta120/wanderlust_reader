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
