/// <reference path="../diablo3farmer.web/scripts/lib/underscore/underscore.js" />
/// <reference path="scripts/jasmine.js" />

'use strict';

describe('paragon level exp requirements', function () {

    var levels;

    beforeEach(function() {
        levels = [];
        levels.push({ requiredExp: 7200000 });
        for (var level = 1; level < 100; level++) {
            
            var rate = 1440000;
            if (level > 59 && level <= 69) {
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
            levels.push({ requiredExp: requiredExp });
        }
    });

    it('Max exp for 1 level is 7,200,000', function() {
        var firstLevel = levels[0];
        expect(firstLevel.requiredExp).toBe(7200000);
    });

    describe('For Levels 1-60, experience requirements increase at a rate of 1,440,000/level', function() {
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

    describe('Calculate correct total experience when character has leveled in middle of run', function() {
        var endExp = 1450;
        var startLevel;
        var endLevel;

        beforeEach(function () {
            startLevel = levels[33];
            endLevel = levels[36];
        });

        it('earned end experience should be', function() {
            var expected;
            expected = 54720000; // to end of level 34
            expected += 56160000; // to end of level 35
            expected += 57600000; // to end fo level 36
            expected += 1450; // start of level 37

            var levelCount = _.indexOf(levels, endLevel) - _.indexOf(levels, startLevel);
            var expFromLevels = _.chain(levels)
                .rest( _.indexOf(levels, startLevel) )
                .first(levelCount)
                .reduce(function(sum, level) {
                    return sum + level.requiredExp;
                }, 0)
                .value();

            var totalEndExp = expFromLevels + endExp;
            expect(totalEndExp).toBe(expected);
        });
    });
});