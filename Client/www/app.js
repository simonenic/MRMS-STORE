angular.module('mrmsApp',['appRoutes','userControllers','userServices','ngAnimate','loginController','authServices'])

.config(function($httpProvider){
$httpProvider.interceptors.push('AuthInterceptors');
});
