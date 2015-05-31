'use strict';

/**
 * @ngdoc function
 * @name myAngularGeneratorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAngularGeneratorApp
 */
angular.module('myAngularGeneratorApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    $http.get('/api/awesome-things')
      .success(function(data) {
//         console.debug(data);
        $scope.awesomeThings = data;
      });
  });
