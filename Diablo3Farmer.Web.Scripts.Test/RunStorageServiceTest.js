/// <reference path="Scripts/jasmine.js" />
/// <reference path="Scripts/Lib/angular.js" />
/// <reference path="Scripts/Lib/angular-mocks.js" />
/// <reference path="Scripts/Services.js" />
'use strict';

describe('runStorageService', function() {

    var runStorageService;
    var windowSpy = {
        localStorage : jasmine.createSpyObj('localStorage', ['getItem', 'setItem'])
    };
    
    beforeEach(function() {
        module('Diablo3Farmer.Services');
        module(function($provide) {
            $provide.value('$window', windowSpy);
        });
        inject(function ($injector) {
            runStorageService = $injector.get('runStorageService');
        });
    });

    it('should exists', function() {
        expect(runStorageService).toNotBe(null);
    });

    describe('load', function () {
        it('should get item from localStorage', function () {
            windowSpy.localStorage.getItem.andReturn(null);
            runStorageService.load();
            expect(windowSpy.localStorage.getItem).toHaveBeenCalledWith('Diablo3Farmer.runs');
        });

        it('should return empty array if item is not found', function() {
            windowSpy.localStorage.getItem.andReturn(null);
            var result = runStorageService.load();
            expect(result).toEqual([]);
        });

        it('should parse item to JSON', function () {
            var expectedRuns = [{ name: 'test' }];
            windowSpy.localStorage.getItem.andReturn(JSON.stringify(expectedRuns));

            var actualRuns = runStorageService.load();
            expect(actualRuns).toEqual(expectedRuns);
        });
    });

    describe('save', function() {
        it('should save runs as json', function () {
            var runs = [{ name: 'test' }];
            runStorageService.save(runs);
            expect(windowSpy.localStorage.setItem).toHaveBeenCalledWith('Diablo3Farmer.runs', JSON.stringify(runs));
        });
    });
});