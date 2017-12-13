angular.module('mainApplication',[])

.controller('visualizzaprodCtrl', function($scope, $http){

    $http.get('/visualizzaprodotti').then(function(data){
        $scope.test= data.data;
    });

});


