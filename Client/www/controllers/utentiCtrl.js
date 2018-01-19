angular.module('visualizzautentiController',[])
.controller('utentiCtrl', function(User){
    var app=this;
    app.errorMsg=false;
  
   function getUsers(){
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
   }

   getUsers();


app.showMore=function(number){
    
    if(number>0){
        app.limit=number;
    }else{
        app.showMoreError='Inserisci un numero valido';
    }

};
app.showAll=function(){
    app.limit=undefined;
};

app.deleteUser=function(username){
    User.deleteUser(username).then(function(data){
    if(data.data.success){
     getUsers();
    }else{
        app.showMoreError=data.data.message;
    }
    });
};
});