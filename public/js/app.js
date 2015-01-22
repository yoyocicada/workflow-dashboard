// Declare app level module which depends on filters, and services
angular.module('workflow-dashboard', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date','btford.socket-io','ngAnimate']).factory('mySocket', function (socketFactory) {
	return socketFactory();
	})
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'})
      .otherwise({redirectTo: '/'});
  }]);
