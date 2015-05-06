'use strict';

(function() {
	// Attendees Controller Spec
	describe('Attendees Controller Tests', function() {
		// Initialize global variables
		var AttendeesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Attendees controller.
			AttendeesController = $controller('AttendeesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Attendee object fetched from XHR', inject(function(Attendees) {
			// Create sample Attendee using the Attendees service
			var sampleAttendee = new Attendees({
				name: 'New Attendee'
			});

			// Create a sample Attendees array that includes the new Attendee
			var sampleAttendees = [sampleAttendee];

			// Set GET response
			$httpBackend.expectGET('attendees').respond(sampleAttendees);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.attendees).toEqualData(sampleAttendees);
		}));

		it('$scope.findOne() should create an array with one Attendee object fetched from XHR using a attendeeId URL parameter', inject(function(Attendees) {
			// Define a sample Attendee object
			var sampleAttendee = new Attendees({
				name: 'New Attendee'
			});

			// Set the URL parameter
			$stateParams.attendeeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/attendees\/([0-9a-fA-F]{24})$/).respond(sampleAttendee);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.attendee).toEqualData(sampleAttendee);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Attendees) {
			// Create a sample Attendee object
			var sampleAttendeePostData = new Attendees({
				name: 'New Attendee'
			});

			// Create a sample Attendee response
			var sampleAttendeeResponse = new Attendees({
				_id: '525cf20451979dea2c000001',
				name: 'New Attendee'
			});

			// Fixture mock form input values
			scope.name = 'New Attendee';

			// Set POST response
			$httpBackend.expectPOST('attendees', sampleAttendeePostData).respond(sampleAttendeeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Attendee was created
			expect($location.path()).toBe('/attendees/' + sampleAttendeeResponse._id);
		}));

		it('$scope.update() should update a valid Attendee', inject(function(Attendees) {
			// Define a sample Attendee put data
			var sampleAttendeePutData = new Attendees({
				_id: '525cf20451979dea2c000001',
				name: 'New Attendee'
			});

			// Mock Attendee in scope
			scope.attendee = sampleAttendeePutData;

			// Set PUT response
			$httpBackend.expectPUT(/attendees\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/attendees/' + sampleAttendeePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid attendeeId and remove the Attendee from the scope', inject(function(Attendees) {
			// Create new Attendee object
			var sampleAttendee = new Attendees({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Attendees array and include the Attendee
			scope.attendees = [sampleAttendee];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/attendees\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAttendee);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.attendees.length).toBe(0);
		}));
	});
}());