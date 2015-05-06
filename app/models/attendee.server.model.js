'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Attendee Schema
 */
var AttendeeSchema = new Schema({
	firstName: {
 		type: String,
 		default: '',
 		required: 'Please fill First name',
 		trim: true
 	},
 	lastName: {
 		type: String,
 		default: '',
 		required: 'Please fill Last name',
 		trim: true
 	},
 	telephone: {
 		type: String,
 		default: '',
 		required: 'Please fill telephone',
 		trim: true
 	},
 	email: {
 		type: String,
 		default: '',
 		required: 'Please fill email',
 		trim: true
 	},
 	gender: {
 		type: String,
 		default: '',
 		required: 'Please fill gender',
 		trim: true
 	},
 	school: {
 		type: String,
 		default: '',
 		required: 'Please fill school',
 		trim: true
 	},
 	shirt: {
 		type: String,
 		default: '',
 		required: 'Please fill shirt',
 		trim: true
 	},
 	hearAboutUs: {
 		type: String,
 		default: '',
 		required: 'Please fill How did you hear about us',
 		trim: true
 	},
 	created: {
 		type: Date,
 		default: Date.now
 	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Attendee', AttendeeSchema);
