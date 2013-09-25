'use strict';
angular.module('Diablo3Farmer', ['Diablo3Farmer.Controllers', 'Diablo3Farmer.Services', 'ngGrid'])
    .factory('dateService', function() {
        return {
            now: function () {
                return Date.now();
            }
        };
    });
    
