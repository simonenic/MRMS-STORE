angular.module('mrmsApp',['appRoutes','userControllers','userServices','ngAnimate','loginController','authServices','adminController'])

.config(function($httpProvider){
$httpProvider.interceptors.push('AuthInterceptors');
});
