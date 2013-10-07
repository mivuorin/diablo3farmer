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

    this.end = function (endExp, endTime, essences, tears) {
        self.endExp = endExp;
        self.endTime = endTime;
        self.time = moment(self.endTime).diff(self.startTime);
        self.expPerHour = calculatePerHour(self.endExp - self.startExp);
        self.essencesPerHour = calculatePerHour(essences);
        self.tearsPerHour = calculatePerHour(tears);
    };

    function calculatePerHour(total) {
        var elapsedSeconds = moment.duration(self.time).asSeconds();
        return Math.round((total / elapsedSeconds) * 3600);
    }
};