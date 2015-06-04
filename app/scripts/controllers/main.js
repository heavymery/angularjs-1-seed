'use strict';

/**
 * @ngdoc function
 * @name myAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAngular
 */
angular.module('myAngular')
  .controller('MainCtrl', function ($scope, $http) {
    
    $http.get('/api/awesome-things')
      .success(function(data) {
//         console.debug(data);
        $scope.awesomeThings = data;
      });
  });
