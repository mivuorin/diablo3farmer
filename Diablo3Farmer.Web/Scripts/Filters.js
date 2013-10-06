'use strict';

angular.module('Diablo3Farmer.Filters', [])
    .filter('groupByName', function () {
        return _.memoize(function(collection) {
            return _.groupBy(collection, function(item) {
                return item.name;
            });
        });
    })
    .filter('timeSpan', function() {
        return function (input) {
            return moment.utc(input).format('HH:mm:ss');
        };
    });