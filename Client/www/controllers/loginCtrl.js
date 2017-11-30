angular.module('loginController',['authServices'])
.controller('loginCtrl',function(Auth, $timeout, $location,$rootScope,User){
    var app=this;
    app.loadme= false;
    $rootScope.$on('$routeChangeStart', function(){
       
        if(Auth.isLoggedIn()) {
            app.isLoggedIn=true;
            Auth.getUser().then(function(data){
                app.username= data.data.username;
                app.useremail= data.data.email;
               User.getPermission().then(function(data){
                   if(data.data.permission==='admin' || data.data.permission==='moderator'){
                       app.autorizzazione= true;
                       app.loadme= true;
                   }else{
                    app.loadme= true;
                   }
               });





               
            });
           
        } else {
           app.isLoggedIn=false;
           app.username= '';
           app.loadme= true;
        }
     
    });
   


    this.doLogin= function(loginData){
        app.loading=true;
        app.errorMsg=false;
        Auth.login(app.loginData).then(function(data){
           if(data.data.success){
               app.loading= false;
            app.successMsg= data.data.message + '...Torna alla home page';
            $timeout(function(){
                $location.path('/about');
                app.successMsg=false;
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







