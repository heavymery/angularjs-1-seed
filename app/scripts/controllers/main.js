'use strict';

/**
 * @ngdoc function
 * @name myAngularGeneratorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAngularGeneratorApp
 */
angular.module('myAngularGeneratorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
