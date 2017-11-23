
angular.module('authServices',[])
.factory('Auth', function($http){
   var authFactory={};
  //User.create(regData);
  authFactory.login=function(loginData){
      return $http.post('/api/autenticazione',loginData);
  }
  return authFactory;
});