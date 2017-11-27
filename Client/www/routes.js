angular.module('appRoutes',['ngRoute'])
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
        controllerAs: 'registrazione'

    })

    .when('/login',{
        templateUrl:'templates/login.html'
    })

    .when('/logout',{
        templateUrl: 'templates/logout.html'
    })

    .when('/profilo',{
        templateUrl: 'templates/profilo.html'
    })
});

