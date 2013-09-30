'use strict';

// todo figure out why .filter method clashes with underscore or jquery? .value works in test but not in running app
angular.module('Diablo3Farmer.Filters', []).filter('groupByName', function () {
        return _.memoize(function(collection) {
            return _.groupBy(collection, function(item) {
                return item.name;
            });
        });
    });