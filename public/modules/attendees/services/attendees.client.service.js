'use strict';

//Attendees service used to communicate Attendees REST endpoints
angular.module('attendees').factory('Attendees', ['$resource',
	function($resource) {
		return $resource('attendees/:attendeeId', { attendeeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);