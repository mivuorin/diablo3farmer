Diablo 3 Farm run calculator
============================

Goal of app is to help Diablo 3 players to find best farming run which gives most xp or gold per hour.
This is done by measuring how much time it takes to finish particular run and then compare starting values to end vlaues
and calculate how good run was.

Side goal of project is to learn AngularJS and develop small app in it.

TODO:
 * Create styles and better UI layout
 ** Fix layout in IE
 ** Fix inline form field sizes
 * Add angular end to end test
 * Gold / hour feature
 * Loot: blues, rares, legendaries feature
 * Add warning if browser does not support local storage or other fearures required by app
 * Add info or about view and use Angular view for that
 * Persist last run to locastore
 * Add sorting to ng-repeater table
 * After starting run focus should be in endExperience field
 * Add validation to start experience field which needs to be number
 * Add character level feature so that when character levels up in middle of run they no longer need to manually calculate total ending experience.
 * Custom validation directive for number field
 ** Angular cannot determine if number is dirty and raise validation error when user inputs invalid number (eg. 'asd') becuase browser does not register invalid number input.