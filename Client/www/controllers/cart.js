angular.module('cart', [])
.controller('cartCtrl',['$scope', function($scope){
  $http.get('/list.json'.then(function(response){
      $scope.shopData=response.data;
  }));
}])
