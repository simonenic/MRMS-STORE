angular.module('loginController',['authServices'])
.controller('loginCtrl', function(Auth,$timeout,$location){
    var app=this;
    this.Login =function(loginData){
        app.caricamento= true;
        app.errorMsg=false;
        Auth.login(app.loginData).then(function(data){
           if(data.data.success){
               app.caricamento=false;
               //Creazione del messaggio di successo
               app.successMsg=data.data.message+'....torna alla home page';
               //Torna alla home page
               $timeout(function(){
                $location.path('/');
               },3000);
               
           }else{
               app.caricamento=false;
               //Creazione del messaggio di errore
               app.errorMsg=data.data.message;
           }
        });
    };
    });    



