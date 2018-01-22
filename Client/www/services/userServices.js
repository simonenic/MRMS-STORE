angular.module('userServices',[])
.factory('User', function($http){
 userFactory= {};
 
 userFactory.create= function(regData){
     return $http.post('/api/users',regData);
 };

userFactory.getPermission= function(){
return $http.get('/api/permission/');
};

userFactory.getUsers=function(){
    return $http.get('/api/visualizzautenti/');
 };


userFactory.deleteUser= function(username){
   return $http.delete('/api/visualizzautenti/' + username);
};


 return userFactory;
});

