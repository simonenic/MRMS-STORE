angular.module('prodottoControllers',['prodottoServices'])
.controller('prdCtrl', function($http,$location,$timeout,Prodotto){

    var app= this;
      this.aggProd = function(regData){
          app.errorMsg=false;
          Prodotto.create(app.regData).then(function(data){
              if(data.data.success){
                  app.successMsg= data.data.message;
                  $timeout(function(){
                    $location.path('/admin');
                  },2000);
                 
              }else{
                  app.errorMsg= data.data.message;
              }
          });
      };
});