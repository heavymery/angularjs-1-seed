'use strict';

/**
 * @ngdoc function
 * @name myAngular.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAngular
 */
angular.module('myAngular')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
