/// <reference path="Scripts/jasmine.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular-mocks.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/underscore/underscore.js" />
/// <reference path="../diablo3farmer.web/scripts/controllers.js" />
/// <reference path="../diablo3farmer.web/scripts/services.js" />
/// <reference path="../Diablo3Farmer.Web/scripts/run.js" />

'use strict';
//Prevents jasmine to notify ReSharper for end of test run. Can be used on debuggin purposes.
//jasmine.getEnv().currentRunner_.finishCallback = function () {};

describe('FarmRunController', function() {
    var scope;
    var dateServiceSpy;
    var runStorageServiceSpy;
    var paragonLevelServiceSpy;
    var defaultLevel = { name: '00' };

    beforeEach(function() {
        module('Diablo3Farmer.Controllers');
        module('Diablo3Farmer.Services');
        
        module(function($provide) {
            $provide.value('dateService', dateServiceSpy);
            $provide.value('runStoreService', runStorageServiceSpy);
            $provide.value('paragonLevelService', paragonLevelServiceSpy);
        });
        
        dateServiceSpy = jasmine.createSpyObj('dateService', ['now']);
        
        runStorageServiceSpy = jasmine.createSpyObj('runStorageService', ['load', 'save']);
        runStorageServiceSpy.load.andReturn([]);
        
        paragonLevelServiceSpy = jasmine.createSpyObj('paragonLevelService', ['getLevels', 'getRequiredExp']);
        paragonLevelServiceSpy.getLevels.andReturn([defaultLevel]);
    });

    function createController() {
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('FarmRunController', {
                $scope: scope,
                dateService: dateServiceSpy,
                runStorageService: runStorageServiceSpy,
                paragonLevelService: paragonLevelServiceSpy
            });
        });
    }
    
    describe('creating controller', function() {
        var runSpy;
        var newRunSpy;
        
        beforeEach(function() {
            runSpy = jasmine.createSpyObj('Run', ['start', 'end']);
            newRunSpy = spyOn(window, 'Run').andReturn(runSpy);
            createController();
        });
        
        it('should return monster power levels', function() {
            expect(scope.monsterPowerLevels).toEqual(['MP01', 'MP02', 'MP03', 'MP04', 'MP05', 'MP06', 'MP07', 'MP08', 'MP09', 'MP10']);
        });

        it('should get runs from run store', function() {
            expect(runStorageServiceSpy.load).toHaveBeenCalled();
            expect(scope.runs).toEqual([]);
        });

        it('should create new run', function() {
            expect(newRunSpy).toHaveBeenCalledWith('', scope.monsterPowerLevels[0], scope.acts[0]);
        });

        it('should get paragonLevels', function() {
            expect(paragonLevelServiceSpy.getLevels).toHaveBeenCalled();
        });
        
        it('should set default paragon start level', function() {
            expect(scope.startLevel).toBe(defaultLevel);
        });

        it('should set default paragon end level', function() {
            expect(scope.endLevel).toBe(defaultLevel);
        });

        describe('starting new run', function() {

            var startExp = 250;
            var startTime = Date.now();
            var startLevel = { name: '02' };

            beforeEach(function() {
                dateServiceSpy.now.andReturn(startTime);
                scope.startLevel = startLevel;
                scope.run.startExp = startExp;
                scope.startRun();
            });

            it('should prefill endExp to startExp', function() {
                expect(scope.run.endExp).toBe(startExp);
            });

            it('should start run with start time', function() {
                expect(runSpy.start).toHaveBeenCalledWith(startTime);
            });

            it('should set collected essences to 0', function() {
                expect(scope.essences).toBe(0);
            });

            it('should set collected tears to 0', function() {
                expect(scope.tears).toBe(0);
            });

            it('should set endLevel to startLevel', function () {
                expect(scope.endLevel).toEqual(startLevel);
            });

            describe('when ending farming run', function() {
                var endTime = Date.now();
                var endExp = 500;
                var essences = 105;
                var tears = 354;
                var expFromLevels = 5454;
                var endLevel = { name: '03' };
                
                beforeEach(function() {
                    dateServiceSpy.now.andReturn(endTime);
                    paragonLevelServiceSpy.getRequiredExp.andReturn(expFromLevels);
                    
                    scope.endLevel = endLevel;
                    scope.endExp = endExp;
                    scope.essences = essences;
                    scope.tears = tears;
                    scope.endRun();
                });
                
                it('should end run with end exp, end time, collected essences and tears', function() {
                    expect(runSpy.end).toHaveBeenCalledWith(endTime, essences, tears);
                });

                it('should set start exp to end experience', function() {
                    expect(scope.run.startExp).toBe(scope.run.endExp);
                });

                it('should save runs to runStorage', function() {
                    expect(runStorageServiceSpy.save).toHaveBeenCalledWith(scope.runs);
                });

                it('should add run to runs array', function() {
                    expect(scope.runs.length).toBe(1);
                });

                it('should get required exp from paragon levels', function() {
                    expect(paragonLevelServiceSpy.getRequiredExp).toHaveBeenCalledWith(startLevel, endLevel);
                });

                it('should calculate runs exp from paragon levels', function() {
                    expect(scope.run.expFromLevels).toBe(expFromLevels);
                });

                it('should set start paragon level to end paragon level', function() {
                    expect(scope.startLevel).toBe(scope.endLevel);
                });
            });
        });
    });

    describe('removing run', function() {
        beforeEach(function () {
            createController();

            scope.runs = [
                new Run('first'),
                new Run('second')
            ];

            scope.removeRun(scope.runs[0]);
        });

        it('should remove given run from runs', function() {
            expect(scope.runs.length).toBe(1);
            expect(scope.runs[0].name).toBe('second');
        });

        it('should save runs to runStoreService', function() {
            expect(runStorageServiceSpy.save).toHaveBeenCalledWith(scope.runs);
        });
    });
    
    describe('getRunNames', function () {
        var runNames;
        beforeEach(function () {
            createController();

            scope.runs = [
                new Run('a'),
                new Run('b'),
                new Run('b'),
                new Run('c')
            ];
            
            runNames = scope.getRunNames();
        });
        
        it('should return grouped names for name typeahed', function() {
            expect(runNames).toEqual(['a', 'b', 'c']);
        });
    });
});