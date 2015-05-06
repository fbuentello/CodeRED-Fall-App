'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Attendee = mongoose.model('Attendee'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, attendee;

/**
 * Attendee routes tests
 */
describe('Attendee CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Attendee
		user.save(function() {
			attendee = {
				name: 'Attendee Name'
			};

			done();
		});
	});

	it('should be able to save Attendee instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendee
				agent.post('/attendees')
					.send(attendee)
					.expect(200)
					.end(function(attendeeSaveErr, attendeeSaveRes) {
						// Handle Attendee save error
						if (attendeeSaveErr) done(attendeeSaveErr);

						// Get a list of Attendees
						agent.get('/attendees')
							.end(function(attendeesGetErr, attendeesGetRes) {
								// Handle Attendee save error
								if (attendeesGetErr) done(attendeesGetErr);

								// Get Attendees list
								var attendees = attendeesGetRes.body;

								// Set assertions
								(attendees[0].user._id).should.equal(userId);
								(attendees[0].name).should.match('Attendee Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Attendee instance if not logged in', function(done) {
		agent.post('/attendees')
			.send(attendee)
			.expect(401)
			.end(function(attendeeSaveErr, attendeeSaveRes) {
				// Call the assertion callback
				done(attendeeSaveErr);
			});
	});

	it('should not be able to save Attendee instance if no name is provided', function(done) {
		// Invalidate name field
		attendee.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendee
				agent.post('/attendees')
					.send(attendee)
					.expect(400)
					.end(function(attendeeSaveErr, attendeeSaveRes) {
						// Set message assertion
						(attendeeSaveRes.body.message).should.match('Please fill Attendee name');
						
						// Handle Attendee save error
						done(attendeeSaveErr);
					});
			});
	});

	it('should be able to update Attendee instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendee
				agent.post('/attendees')
					.send(attendee)
					.expect(200)
					.end(function(attendeeSaveErr, attendeeSaveRes) {
						// Handle Attendee save error
						if (attendeeSaveErr) done(attendeeSaveErr);

						// Update Attendee name
						attendee.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Attendee
						agent.put('/attendees/' + attendeeSaveRes.body._id)
							.send(attendee)
							.expect(200)
							.end(function(attendeeUpdateErr, attendeeUpdateRes) {
								// Handle Attendee update error
								if (attendeeUpdateErr) done(attendeeUpdateErr);

								// Set assertions
								(attendeeUpdateRes.body._id).should.equal(attendeeSaveRes.body._id);
								(attendeeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Attendees if not signed in', function(done) {
		// Create new Attendee model instance
		var attendeeObj = new Attendee(attendee);

		// Save the Attendee
		attendeeObj.save(function() {
			// Request Attendees
			request(app).get('/attendees')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Attendee if not signed in', function(done) {
		// Create new Attendee model instance
		var attendeeObj = new Attendee(attendee);

		// Save the Attendee
		attendeeObj.save(function() {
			request(app).get('/attendees/' + attendeeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', attendee.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Attendee instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendee
				agent.post('/attendees')
					.send(attendee)
					.expect(200)
					.end(function(attendeeSaveErr, attendeeSaveRes) {
						// Handle Attendee save error
						if (attendeeSaveErr) done(attendeeSaveErr);

						// Delete existing Attendee
						agent.delete('/attendees/' + attendeeSaveRes.body._id)
							.send(attendee)
							.expect(200)
							.end(function(attendeeDeleteErr, attendeeDeleteRes) {
								// Handle Attendee error error
								if (attendeeDeleteErr) done(attendeeDeleteErr);

								// Set assertions
								(attendeeDeleteRes.body._id).should.equal(attendeeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Attendee instance if not signed in', function(done) {
		// Set Attendee user 
		attendee.user = user;

		// Create new Attendee model instance
		var attendeeObj = new Attendee(attendee);

		// Save the Attendee
		attendeeObj.save(function() {
			// Try deleting Attendee
			request(app).delete('/attendees/' + attendeeObj._id)
			.expect(401)
			.end(function(attendeeDeleteErr, attendeeDeleteRes) {
				// Set message assertion
				(attendeeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Attendee error error
				done(attendeeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Attendee.remove().exec();
		done();
	});
});