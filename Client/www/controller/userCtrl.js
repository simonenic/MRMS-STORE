angular.module('userControllers',['userServices'])
.controller('regCtrl',function($http,$location,$timeout,User){
    var app=this;
    this.regUser =function(regData){
        app.caricamento= true;
        app.errorMsg=false;
        User.create(app.regData).then(function(data){
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
