'use strict';

// Configuring the Articles module
angular.module('attendees').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Attendees', 'attendees', 'dropdown', '/attendees(/create)?');
		Menus.addSubMenuItem('topbar', 'attendees', 'List Attendees', 'attendees');
		Menus.addSubMenuItem('topbar', 'attendees', 'New Attendee', 'attendees/create');
	}
]);