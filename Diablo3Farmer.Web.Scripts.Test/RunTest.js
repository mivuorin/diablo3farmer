﻿/// <reference path="scripts/jasmine.js" />
/// <reference path="../diablo3farmer.web/scripts/run.js" />
/// <reference path="../diablo3farmer.web/scripts/Lib/moment-2.2.1/moment.js" />

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

        it('should be not started', function() {
            expect(run.isRunning).toBe(false);
        });

        it('startExp should be 0', function() {
            expect(run.startExp).toBe(0);
        });

        it('endExp should be 0', function() {
            expect(run.endExp).toBe(0);
        });

        it('expFromLevels should be 0', function() {
            expect(run.expFromLevels).toBe(0);
        });

        describe('when starting run', function() {
            var startExp = 500;
            var startTime = new Date();

            beforeEach(function () {
                run.startExp = startExp;
                run.start(startTime);
            });

            it('should set start exp', function() {
                expect(run.startExp).toBe(startExp);
            });

            it('should set start time', function() {
                expect(run.startTime).toBe(startTime);
            });

            it('isRunning should be true', function() {
                expect(run.isRunning).toBe(true);
            });

            describe('when ending run', function() {
                var expFromLevels = 250;
                var endExp = 750;
                var endTime;
                var essences = 205;
                var tears = 123;
                
                beforeEach(function() {
                    endTime = moment(startTime).clone().add('hours', 1).toDate();
                    run.endExp = endExp;
                    run.expFromLevels = expFromLevels;
                    run.end(endTime, essences, tears);
                });

                it('should set end exp', function() {
                    expect(run.endExp).toBe(endExp);
                });

                it('should calculate exp per hour', function() {
                    expect(run.expPerHour).toBe(500);
                });

                it('should calculate run time', function () {
                    var hourInMs = moment.duration(1, 'hours').asMilliseconds();
                    expect(run.time).toBe(hourInMs);
                });

                it('should calculate essences per hour', function() {
                    expect(run.essencesPerHour).toBe(essences);
                });

                it('should calculate tears per hour', function() {
                    expect(run.tearsPerHour).toBe(tears);
                });

                it('isRunning should be false', function() {
                    expect(run.isRunning).toBe(false);
                });
            });
        });
    });
});