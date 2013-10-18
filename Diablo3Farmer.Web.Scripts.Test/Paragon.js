/// <reference path="scripts/jasmine.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/angular-1.2.0-rc.2/angular-mocks.js" />
/// <reference path="../diablo3farmer.web/scripts/lib/underscore/underscore.js" />
/// <reference path="../diablo3farmer.web/scripts/services.js" />

'use strict';

describe('paragon level exp requirements', function () {

    var paragonLevelService;
    beforeEach(function() {
        module('Diablo3Farmer.Services');
        inject(function(_paragonLevelService_) {
            paragonLevelService = _paragonLevelService_;
        });
    });

    it('service should be defined', function() {
        expect(paragonLevelService).toBeDefined();
    });

    describe('getLevels should return array of paragon level exp requirements', function () {
        var levels;
        beforeEach(function() {
            levels = paragonLevelService.getLevels();
        });

        describe('For Levels 1-60, experience requirements increase at a rate of 1,440,000/level', function () {
            it('Max exp for 1 level is 7,200,000', function() {
                expect(levels[0].requiredExp).toBe(7200000);
            });
        
            it('Level 60 max exp should be 92,160,000', function() {
                expect(levels[59].requiredExp).toBe(92160000);
            });
        });

        describe('For Levels 61-70, experience requirements increase at a rate of 2,880,000/level (=2*1,440,000)', function() {
            it('Level 61 max exp should be 95,040,000', function() {
                 expect(levels[60].requiredExp).toBe(95040000);
            });
        
            it('Level 70 max exp should be 120,960,000', function() {
                 expect(levels[69].requiredExp).toBe(120960000);
            });
        });
    
        describe('For Levels 71-80, experience requirements increase at a rate of 5,020,000/level (=3.5*1,440,000)', function() {
            it('Level 71 max exp should be 126,000,000', function() {
                 expect(levels[70].requiredExp).toBe(126000000);
            });
        
            it('Level 80 max exp should be 171,360,000', function() {
                 expect(levels[79].requiredExp).toBe(171360000);
            });
        });
    
        describe('For Levels 81-90, experience requirements increase at a rate of 6,480,000/level (=4.5*1,440,000)', function() {
            it('Level 81 max exp should be 177,840,000', function() {
                 expect(levels[80].requiredExp).toBe(177840000);
            });
        
            it('Level 90 max exp should be 236,160,000', function() {
                 expect(levels[89].requiredExp).toBe(236160000);
            });
        });
    
        describe('For Levels 91-100, experience requirements increase at a rate of 8,640,000/level (=6*1,440,000)', function() {
            it('Level 91 max exp should be 244,800,000', function() {
                 expect(levels[90].requiredExp).toBe(244800000);
            });
        
            it('Level 100 max exp should be 322,560,000', function() {
                 expect(levels[99].requiredExp).toBe(322560000);
            });
        });
    });

    describe('getTotalExp should return total required exp between given levels', function() {
        var levels;
        beforeEach(function() {
            levels = paragonLevelService.getLevels();
        });

        xit('Required exo from level 0 to level 2 should be...', function() {
          // TODO implement test.  
        });

       it('Required exp from level 34 to level 37 should be 168,480,000', function () {
            var requiredExp = paragonLevelService.getTotalExp(levels[33], levels[36]);
            expect(requiredExp).toBe(168480000);
       });

       it('Required exp from level 89 to level 92 should be 710640000', function () {
            var requiredExp = paragonLevelService.getTotalExp(levels[88], levels[91]);
            expect(requiredExp).toBe(710640000);
        });
    });
});