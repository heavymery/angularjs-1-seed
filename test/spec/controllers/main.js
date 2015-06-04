'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myAngular'));

  var MainCtrl,
      scope,
      httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a list of awesomeThings to the scope', function () {
    httpBackend.expectGET(/^\/api\/awesome-things$/)
      .respond(function () { // function (method, url, data, headers) {
        return [200, [
          { title: 'HTML5 Boilerplate', description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.' },
          { title: 'AngularJS', description: 'AngularJS is a toolset for building the framework most suited to your application development.' },
          { title: 'Karma', description: 'Spectacular Test Runner for JavaScript.' }
        ], {}];
      });

    httpBackend.flush();

    expect(scope.awesomeThings.length).toBe(3);
  });
});
