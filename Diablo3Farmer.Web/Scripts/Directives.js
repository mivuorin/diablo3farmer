'use strict';

angular.module('Diablo3Farmer.Directives', [])
    .directive('d3AutoSelect', function() {
        return function(scope, element, attributes) {
            element.click(function() {
                element.select();
            });
        };
    });