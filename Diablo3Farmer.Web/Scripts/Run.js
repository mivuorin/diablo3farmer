﻿'use strict';

function Run(name, monsterPowerLevel, act) {
    var self = this;
    this.name = name;
    this.monsterPowerLevel = monsterPowerLevel;
    this.act = act;
    this.expPerHour = 0;
    this.isRunning = false;

    this.startExp = 0;
    this.endExp = 0;
    this.expFromLevels = 0;
    
    this.start = function(startTime) {
        self.startTime = startTime;
        self.isRunning = true;
    };

    this.end = function (endTime, essences, tears) {
        self.isRunning = false;
        self.endTime = endTime;
        self.time = moment(self.endTime).diff(self.startTime);
        self.expPerHour = calculatePerHour(self.expFromLevels + self.endExp - self.startExp);
        self.essencesPerHour = calculatePerHour(essences);
        self.tearsPerHour = calculatePerHour(tears);
    };

    function calculatePerHour(total) {
        var elapsedSeconds = moment.duration(self.time).asSeconds();
        return Math.round((total / elapsedSeconds) * 3600);
    }
};