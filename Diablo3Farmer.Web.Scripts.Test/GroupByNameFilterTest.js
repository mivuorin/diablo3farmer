/// <reference path="Scripts/jasmine.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular-mocks.js" />
/// <reference path="../Diablo3Farmer.Web/Scripts/Lib/underscore/underscore.js" />
/// <reference path="../Diablo3Farmer.Web/Scripts/Filters.js" />

'use strict';

describe('groupByName filter', function() {

    var groupByName;
    beforeEach(function() {
        module('Diablo3Farmer.Filters');
        inject(function($filter) {
            groupByName = $filter('groupByName');
        });
    });

    it('should group collection by item name property', function() {
        var items = [
            { name: 'a' },
            { name: 'b' },
            { name: 'b' },
            { name: 'c' }
        ];

        var groups = groupByName(items);

        var expected = {
            'a': [{ name: 'a' }],
            'b': [{ name: 'b' }, { name: 'b' }],
            'c': [{ name: 'c' }]
        };
        
        expect(groups).toEqual(expected);
    });
});