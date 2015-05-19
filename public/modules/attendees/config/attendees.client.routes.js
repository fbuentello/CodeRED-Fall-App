'use strict';

//Setting up route
angular.module('attendees').config(['$stateProvider',
	function($stateProvider) {

		/**
		 * TODO
		 * delete when app does more than attendee signup
		 */

		// Attendees state routing
		$stateProvider.
		// state('listAttendees', {
		// 	url: '/attendees',
		// 	templateUrl: 'modules/attendees/views/list-attendees.client.view.html'
		// }).
		state('createAttendee', {
			url: '/attendees/create',
			templateUrl: 'modules/attendees/views/create-attendee.client.view.html'
		}).
		// state('viewAttendee', {
		// 	url: '/attendees/:attendeeId',
		// 	templateUrl: 'modules/attendees/views/view-attendee.client.view.html'
		// }).
		state('editAttendee', {
			url: '/attendees/:attendeeId/edit',
			templateUrl: 'modules/attendees/views/edit-attendee.client.view.html'
		}).
		state('thankYou', {
			url: '/attendees/:attendeeId/thankYou',
			templateUrl: 'modules/attendees/views/thankyou-attendee.client.view.html'
		});
	}
]);
