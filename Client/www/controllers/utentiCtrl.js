angular.module('visualizzautentiController',[])
.controller('utentiCtrl', function(User){
    var app=this;
    app.errorMsg=false;
    User.getUsers().then(function(data){
      if(data.data.success){
         if(data.data.permission==='admin' || data.data.permission==='moderator'){
         app.users= data.data.users;
         }else{
             app.errorMsg ='Permessi insufficienti';
         }
      }else{
          app.errorMsg=data.data.message;
      }
    });
});