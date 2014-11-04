'use strict';

angular.module('workflow-dashboard')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/dashboarddbs', {
        templateUrl: 'views/dashboardDB/dashboarddbs.html',
        controller: 'DashboardDBController',
        resolve:{
          resolvedDashboardDB: ['DashboardDB', function (DashboardDB) {
            return DashboardDB.query();
          }]
        }
      })
    }]);
