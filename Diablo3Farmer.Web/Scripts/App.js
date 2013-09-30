'use strict';

angular.module('Diablo3Farmer', ['Diablo3Farmer.Controllers', 'Diablo3Farmer.Services', 'Diablo3Farmer.Filters', 'ngGrid', 'ui.bootstrap'])
    .factory('dateService', function() {
        return {
            now: function() {
                return Date.now();
            }
        };
    });
    