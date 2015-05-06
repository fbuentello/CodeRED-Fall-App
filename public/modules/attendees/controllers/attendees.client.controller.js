'use strict';

// Attendees controller
angular.module('attendees').controller('AttendeesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Attendees',
	function($scope, $stateParams, $location, Authentication, Attendees) {
		$scope.authentication = Authentication;

		// Create new Attendee
		$scope.create = function() {
			// Create new Attendee object
			var attendee = new Attendees ({
				name: this.name
			});

			// Redirect after save
			attendee.$save(function(response) {
				$location.path('attendees/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Attendee
		$scope.remove = function(attendee) {
			if ( attendee ) { 
				attendee.$remove();

				for (var i in $scope.attendees) {
					if ($scope.attendees [i] === attendee) {
						$scope.attendees.splice(i, 1);
					}
				}
			} else {
				$scope.attendee.$remove(function() {
					$location.path('attendees');
				});
			}
		};

		// Update existing Attendee
		$scope.update = function() {
			var attendee = $scope.attendee;

			attendee.$update(function() {
				$location.path('attendees/' + attendee._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Attendees
		$scope.find = function() {
			$scope.attendees = Attendees.query();
		};

		// Find existing Attendee
		$scope.findOne = function() {
			$scope.attendee = Attendees.get({ 
				attendeeId: $stateParams.attendeeId
			});
		};
	}
]);