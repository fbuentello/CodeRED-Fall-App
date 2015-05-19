'use strict';

angular.module('users').controller('DashboardController', ['$scope','$location',
	function($scope, $location) {
		// Controller Logic
		// ...

		/**
		 * TODO
		 * delete when app does more than attendee signup
		 */
		$location.path('createAttendee');
	}
]);
