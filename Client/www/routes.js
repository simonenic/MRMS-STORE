angular.module('myApp',['ngRoute',
'userControllers',
'userServices',
'loginController',
'authServices'])
.config(function($routeProvider) {
    $routeProvider
    .when('/',{
          templateUrl:'templates/home.html'
    })
    .when('/about',{
        templateUrl: 'templates/about.html'
    })
    .when('/registrazione',{
        templateUrl:'templates/registrazione.html',
        controller: 'regCtrl',
        controllerAs: 'registrazione'
    })
    .when('/login',{
        templateUrl:'templates/login.html',
        controller: 'loginCtrl',
        controllerAs:'login'
    })
  
});

    


