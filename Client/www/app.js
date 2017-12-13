angular.module('mrmsApp',['appRoutes','userControllers','userServices','ngAnimate','loginController','authServices','adminController',
'prodottoControllers','prodottoServices','visualizzautentiController','mainApplication','mainProdclienti'])

.config(function($httpProvider){
$httpProvider.interceptors.push('AuthInterceptors');
});
