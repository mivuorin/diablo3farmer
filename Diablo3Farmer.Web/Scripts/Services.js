'use strict';

angular.module('Diablo3Farmer.Services', [])
    .factory('runStorageService', ['$window', function($window) {
        return {
            load: function() {
                var item = $window.localStorage.getItem('Diablo3Farmer.runs');
                if (item === null) {
                    return {};
                }
                return JSON.parse(item);
            },
            save: function (runs) {
                var json = JSON.stringify(runs);
                $window.localStorage.setItem('Diablo3Farmer.runs', json);
            }
        };
    }]);