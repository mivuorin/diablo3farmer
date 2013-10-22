'use strict';

angular.module('Diablo3Farmer.Services', [])
    .factory('runStorageService', ['$window', function($window) {
        return {
            load: function() {
                var item = $window.localStorage.getItem('Diablo3Farmer.runs');
                if (item === null) {
                    return [];
                }
                return JSON.parse(item);
            },
            save: function(runs) {
                var json = JSON.stringify(runs);
                $window.localStorage.setItem('Diablo3Farmer.runs', json);
            }
        };
    }])
    .factory('paragonLevelService', [function() {
        var levels = [];
        levels.push({ name: '0', requiredExp: 7200000 });
        for (var level = 1; level <= 100; level++) {

            var rate = 1440000;
            if (level >= 60 && level <= 69) {
                rate = 2 * 1440000;
            } else if (level >= 70 && level <= 79) {
                rate = 3.5 * 1440000;
            } else if (level >= 80 && level <= 89) {
                rate = 4.5 * 1440000;
            } else if (level >= 90) {
                rate = 6 * 1440000;
            }

            var prev = levels[level - 1].requiredExp;
            var requiredExp = prev + rate;
            levels.push({ name: level + '', requiredExp: requiredExp });
        }

        return {
            getLevels: function() {
                return levels;
            },
            getRequiredExp: function (startLevel, endLevel) {
                /// Calculates exp required from start level to end level
                var levelCount = _.indexOf(levels, endLevel) - _.indexOf(levels, startLevel);
                return _.chain(levels)
                    .rest(_.indexOf(levels, startLevel))
                    .first(levelCount)
                    .reduce(function(sum, level) {
                        return sum + level.requiredExp;
                    }, 0)
                    .value();
            }
        };
    }]);