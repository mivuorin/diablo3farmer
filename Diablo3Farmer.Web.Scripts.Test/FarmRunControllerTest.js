/// <reference path="Scripts/jasmine.js" />
/// <reference path="Scripts/Lib/angular.js" />
/// <reference path="Scripts/Lib/angular-mocks.js" />
/// <reference path="Scripts/Controllers.js" />
'use strict';
//Prevents jasmine to notify ReSharper for end of test run. Can be used on debuggin purposes.
//jasmine.getEnv().currentRunner_.finishCallback = function () {};

describe('FarmRunController', function() {

    var scope;
    var controller;
    var dateServiceSpy = jasmine.createSpyObj('dateService', ['now']);
    var runStorageServiceSpy = jasmine.createSpyObj('runStorageService', ['load', 'save']);

    beforeEach(function() {
        module('Diablo3Farmer.Controllers');
        module(function ($provide) {
            $provide.value('dateService', dateServiceSpy);
            $provide.value('runStoreService', runStorageServiceSpy);
        });

        runStorageServiceSpy.load.andReturn([]);

        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('FarmRunController', {
                $scope: scope,
                dateService: dateServiceSpy,
                runStorageService: runStorageServiceSpy
            });
        });
    });
    
    describe('when loading controller', function() {
        it('should return monster power levels', function() {
            expect(scope.monsterPowerLevels).toEqual(['MP01', 'MP02', 'MP03', 'MP04', 'MP05', 'MP06', 'MP07', 'MP08', 'MP09', 'MP10']);
        });

        it('should set default monster power level', function() {
            expect(scope.selectedMonsterPowerLevel).toBe('MP01');
        });

        it('should set default act', function() {
            expect(scope.selectedAct).toEqual( scope.acts[0] );
        });

        it('default description should be empty', function() {
            expect(scope.description).toBe('');
        });

        it('should set run started to false', function () {
            var runStarted = scope.runStarted();
            expect(runStarted).toBe(false);
        });

        it('should get runs from run store', function () {
            expect(runStorageServiceSpy.load).toHaveBeenCalled();
            expect(scope.runs).toEqual([]);
        });
    });

    describe('when starting new farm run', function () {
        
        it('should set correct mp level', function() {
            var mp03 = 'MP03';
            scope.selectedMonsterPowerLevel = mp03;

            scope.startRun();

            var run = scope.currentRun;
            expect(run.monsterPowerLevel).toBe(mp03);
        });

        it('should set correct act', function() {
            scope.selectedAct = 2;

            scope.startRun();

            var run = scope.currentRun;
            expect(run.act).toBe(2);
        });

        it('should set description', function() {
            scope.description = "test";

            scope.startRun();

            var run = scope.currentRun;
            expect(run.description).toBe("test");
        });

        it('should set starting exp', function() {
            scope.startExp = 3548;

            scope.startRun();

            var run = scope.currentRun;
            expect(run.startExp).toBe(3548);
        });

        it('should set start time', function() {
            var expected = Date.now();

            dateServiceSpy.now.andReturn(expected);
            scope.startRun();

            var run = scope.currentRun;
            expect(run.startTime).toEqual(expected);
        });

        it('should start run', function() {
            scope.startRun();
            expect(scope.runStarted()).toBe(true);
        });
    });

    describe('when ending farming run', function() {

        function startRun(startExperience) {
            scope.selectedAct = 1;
            scope.selectedMonsterPowerLevel = 'MP02';
            scope.description = 'Test run';
            scope.startExp = startExperience;
            
            scope.startRun();
        }

        it('should stop run', function () {
            startRun(0);
            scope.endRun();
            expect(scope.runStarted()).toBe(false);
        });

        it('should set end exp', function () {
            startRun(0);

            scope.endExp = 750;
            scope.endRun();
            
            var run = scope.runs[0];
            expect(run.endExp).toBe(750);
        });

        it('should calculate exp per hour', function () {
            var startTime = new Date();
            dateServiceSpy.now.andReturn(startTime);

            startRun(0);
            
            var endTime = new Date();
            endTime.setHours(startTime.getHours() + 1);
            dateServiceSpy.now.andReturn(endTime);

            scope.endExp = 750;
            scope.endRun();
            
            var run = scope.runs[0];
            expect(run.expPerHour).toBe(750);
        });
        
        it('should set start exp to finished experience', function() {
            startRun(6750);
            var endExp = 8557;
            
            scope.endExp = endExp;
            scope.endRun();

            expect(scope.startExp).toBe(endExp);
        });

        it('should save runs', function() {
            startRun(500);
            scope.endRun();
            expect(runStorageServiceSpy.save).toHaveBeenCalledWith(scope.runs);
        });
    });
});