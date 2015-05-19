'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var attendees = require('../../app/controllers/attendees.server.controller');

	// Attendees Routes
	app.route('/attendees')
		.get(attendees.list)
		.post(attendees.create);

	app.route('/attendees/:attendeeId')
		.get(attendees.read)
		.put(users.requiresLogin, attendees.hasAuthorization, attendees.update)
		.delete(users.requiresLogin, attendees.hasAuthorization, attendees.delete);

	// Finish by binding the Attendee middleware
	app.param('attendeeId', attendees.attendeeByID);
};
