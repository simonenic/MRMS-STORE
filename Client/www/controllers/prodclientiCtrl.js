angular.module('mainProdclienti',[])

.controller('prodclientiCtrl', function($scope, $http){

    $http.get('/about').then(function(data){
        $scope.test= data.data;
    });

});