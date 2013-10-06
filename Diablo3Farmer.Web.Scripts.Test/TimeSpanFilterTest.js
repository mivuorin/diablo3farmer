/// <reference path="Scripts/jasmine.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular-mocks.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/moment-2.2.1/moment.js" />
/// <reference path="../Diablo3Farmer.Web/Scripts/Filters.js" />

'use strict';

describe('timeSpan filter', function() {

    var timeSpan;
    beforeEach(function() {
        module('Diablo3Farmer.Filters');
        inject(function($filter) {
            timeSpan = $filter('timeSpan');
        });
    });

    it('should be defined', function() {
        expect(timeSpan).toBeDefined();
    });

    it('should format given time in ms as hh:mm:ss', function() {
        var date = moment.duration({ hour: 13, minute: 15, seconds: 35 }).asMilliseconds();
        var actual = timeSpan(date);
        expect(actual).toBe('13:15:35');
    });
});