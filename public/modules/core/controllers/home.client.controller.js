'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		/**
		 * TODO
		 * delete when app does more than attendee signup
		 */
		$location.path('createAttendee');
	}
]);
