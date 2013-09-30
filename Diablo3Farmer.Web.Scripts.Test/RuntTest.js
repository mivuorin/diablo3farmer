﻿/// <reference path="scripts/jasmine.js" />
/// <reference path="../diablo3farmer.web/scripts/run.js" />

describe('Run test', function() {
    var run;
    var name = 'name';
    var monsterPowerLevel = 'monsterPowerLevel';
    var act = 1;

    describe('when creating new run', function() {
        beforeEach(function() {
            run = new Run(name, monsterPowerLevel, act);
        });

        it('should set name', function() {
            expect(run.name).toBe(name);
        });

        it('should set monster power level', function() {
            expect(run.monsterPowerLevel).toBe(monsterPowerLevel);
        });

        it('should set act', function() {
            expect(run.act).toBe(act);
        });

        it('should set act', function() {
            expect(run.act).toBe(act);
        });

        it('should set exp per hour to zero', function() {
            expect(run.expPerHour).toBe(0);
        });

        describe('when starting run', function() {
            var startExp = 500;
            var startTime = new Date();

            beforeEach(function() {
                run.start(startExp, startTime);
            });

            it('should set start exp', function() {
                expect(run.startExp).toBe(startExp);
            });

            it('should set start time', function() {
                expect(run.startTime).toBe(startTime);
            });

            describe('when ending run', function() {
                var endExp = 750;

                beforeEach(function() {
                    var endTime = new Date();
                    endTime.setHours(startTime.getHours() + 1);

                    run.end(endExp, endTime);
                });

                it('should set end exp', function() {
                    expect(run.endExp).toBe(endExp);
                });

                it('should calculate exp per hour', function() {
                    expect(run.expPerHour).toBe(250);
                });

            });
        });
    });
});