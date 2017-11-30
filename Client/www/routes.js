var app= angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'templates/home.html'
    })
    .when('/about',{
        templateUrl:'templates/about.html'
    })
    .when('/registrazione',{
        templateUrl:'templates/registrazione.html',
        controller: 'regCtrl',
        controllerAs: 'registrazione',
        autenticazione: false
     

    })

    .when('/login',{
        templateUrl:'templates/login.html',
        autenticazione: false
    })

    .when('/logout',{
        templateUrl: 'templates/logout.html',
        autenticazione: true
    })

    .when('/profilo',{
        templateUrl: 'templates/profilo.html',
        autenticazione: true
    })
    .when('/admin',{
        templateUrl:'templates/admin.html',
        controller:'adminCtrl',
        controllerAs:'admin',
        autenticazione: true,
        permission: ['admin' , 'moderator']
    })

    .when('/modifica/:id',{
        templateUrl:'templates/modifica.html',
        controller:'modificaCtrl',
        controllerAs:'modifica',
        autenticazione:true,
        permission: ['admin' , 'moderator']
    })




});



app.run(['$rootScope','Auth','$location','User', function($rootScope, Auth, $location,User){
    $rootScope.$on('$routeChangeStart', function(event,next,current){
    if(next.$$route !== undefined){
       if(next.$$route.autenticazione===true){
         if(!Auth.isLoggedIn()){
             event.preventDefault();
             $location.path('/');
         }else if(next.$$route.permission){
             User.getPermission().then(function(data){
             if(next.$$route.permission[0]!==data.data.permission){
                 if(next.$$route.permission[1]!==data.data.permission){
                    event.preventDefault();
                    $location.path('/');
                 }
             }
            });
         }

       }else if(!next.$$route.autenticazione===false){
           if(Auth.isLoggedIn()){
               event.preventDefault();
               $location.path('/profilo');
           }
       }
    }
    });

}]);



