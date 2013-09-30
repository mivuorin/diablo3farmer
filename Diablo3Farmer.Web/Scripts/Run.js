'use strict';

function Run(name, monsterPowerLevel, act) {
    var self = this;
    this.name = name;
    this.monsterPowerLevel = monsterPowerLevel;
    this.act = act;
    this.expPerHour = 0;

    this.start = function(startExp, startTime) {
        self.startExp = startExp;
        self.startTime = startTime;
    };

    this.end = function (endExp, endTime) {
        self.endExp = endExp;
        self.endTime = endTime;

        calculateExpPerHour();
    };

    function calculateExpPerHour() {
        var elapsedSeconds = (self.endTime - self.startTime) / 1000;
        var totalExp = self.endExp - self.startExp;
        self.expPerHour = Math.round((totalExp / elapsedSeconds) * 3600);
    }
};