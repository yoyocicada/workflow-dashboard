'use strict';

angular.module('workflow-dashboard')
  .factory('DashboardDB', ['$resource', function ($resource) {
    return $resource('workflow-dashboard/dashboarddbs/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
