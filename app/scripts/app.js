'use strict';

/**
 * @ngdoc overview
 * @name myAngularGeneratorApp
 * @description
 * # myAngularGeneratorApp
 *
 * Main module of the application.
 */
angular
  .module('myAngularGeneratorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    // @if DEVELOP
    'ngMockE2E'
    // @endif
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  // @if DEVELOP
  .run(function($httpBackend) {
    $httpBackend.whenGET(/^\/?views\//).passThrough();

    $httpBackend.whenGET(/^\/api\/awesome-things$/)
      .respond(function (method, url, data, headers) {
        return [200, [
          { title: 'HTML5 Boilerplate', description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.' },
          { title: 'AngularJS', description: 'AngularJS is a toolset for building the framework most suited to your application development.' },
          { title: 'Karma', description: 'Spectacular Test Runner for JavaScript.' }
        ], {}];
      });
  })
  // @endif
;
