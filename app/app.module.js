'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'ngCookies',
	'myApp.login',
	'myApp.testPage',
	'myApp.version',
	'mm.foundation'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/login'});
}])

.controller('ApplicationController',
function ($scope, USER_ROLES, AuthService, $cookies) {

	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;

	// If the user cookies are set, use them
	var userId = $cookies.get("userId");
	var userRole = $cookies.get("userRole");

	if (userId && userRole) {
		$scope.currentUser = {
			id: userId,
			role: userRole
		};
	}

	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	};


})

.run(function ($rootScope, AUTH_EVENTS, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });



});
