angular.module('loginController',['authServices'])
.controller('loginCtrl',function(Auth, $timeout, $location){
    var app=this;
    if(Auth.isLoggedIn()) {
        console.log('Success: Utente loggato con successo');
        Auth.getUser().then(function(data){
            console.log(data.data.username);
            app.username= data.data.username;
        });
    } else {
       console.log('Failure');
    }

    this.doLogin= function(loginData){
        app.loading=true;
        app.errorMsg=false;
        Auth.login(app.loginData).then(function(data){
           if(data.data.success){
               app.loading= false;
            app.successMsg= data.data.message + '...Torna alla home page';
            $timeout(function(){
                $location.path('/about');
            },2000);
            
           }else{
            app.loading= false,
            app.errorMsg= data.data.message;
           }
        });
    };

    this.logout= function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        },3000);
    };
    });







