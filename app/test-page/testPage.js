'use strict';

angular.module('myApp.testPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/test-page', {
    templateUrl: './app/test-page/test-page.html',
    controller: 'TestPageCtrl'
  });
}])

.controller('TestPageCtrl', [function() {

}]);