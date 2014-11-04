'use strict';

angular.module('workflow-dashboard')
  .controller('DashboardDBController', ['$scope', '$modal', 'resolvedDashboardDB', 'DashboardDB',
    function ($scope, $modal, resolvedDashboardDB, DashboardDB) {

      $scope.dashboarddbs = resolvedDashboardDB;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.dashboardDB = DashboardDB.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        DashboardDB.delete({id: id},
          function () {
            $scope.dashboarddbs = DashboardDB.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          DashboardDB.update({id: id}, $scope.dashboardDB,
            function () {
              $scope.dashboarddbs = DashboardDB.query();
              $scope.clear();
            });
        } else {
          DashboardDB.save($scope.dashboardDB,
            function () {
              $scope.dashboarddbs = DashboardDB.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.dashboardDB = {
          
          "dashboardDB": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var dashboardDBSave = $modal.open({
          templateUrl: 'dashboardDB-save.html',
          controller: 'DashboardDBSaveController',
          resolve: {
            dashboardDB: function () {
              return $scope.dashboardDB;
            }
          }
        });

        dashboardDBSave.result.then(function (entity) {
          $scope.dashboardDB = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('DashboardDBSaveController', ['$scope', '$modalInstance', 'dashboardDB',
    function ($scope, $modalInstance, dashboardDB) {
      $scope.dashboardDB = dashboardDB;

      

      $scope.ok = function () {
        $modalInstance.close($scope.dashboardDB);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
