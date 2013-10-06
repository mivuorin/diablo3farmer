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
        self.time = moment(self.endTime).diff(self.startTime);
        calculateExpPerHour();
    };

    function calculateExpPerHour() {
        var elapsedSeconds = moment.duration(self.time).asSeconds();
        var totalExp = self.endExp - self.startExp;
        self.expPerHour = Math.round((totalExp / elapsedSeconds) * 3600);
    }
};