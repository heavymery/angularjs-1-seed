'use strict';

/**
 * @ngdoc function
 * @name myAngularGeneratorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAngularGeneratorApp
 */
angular.module('myAngularGeneratorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
