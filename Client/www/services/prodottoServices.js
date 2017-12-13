angular.module('prodottoServices',[])
.factory('Prodotto', function($http){
      prodottoFactory={};
      //Prodotto.create(regData)
      prodottoFactory.create= function(regData){
          return $http.post('/api/prodottos', regData);
      };
      return prodottoFactory;
});