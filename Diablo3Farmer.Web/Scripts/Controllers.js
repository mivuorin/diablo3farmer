'use strict';

angular.module('Diablo3Farmer.Controllers', [])
    .controller('FarmRunController', ['$scope', 'dateService', 'runStorageService', function($scope, dateService, runStorageService) {

        $scope.monsterPowerLevels = ['MP01', 'MP02', 'MP03', 'MP04', 'MP05', 'MP06', 'MP07', 'MP08', 'MP09', 'MP10'];
        $scope.selectedMonsterPowerLevel = $scope.monsterPowerLevels[0];

        $scope.acts = [
            { name: 'Act 1', value: 1, },
            { name: 'Act 2', value: 2, },
            { name: 'Act 3', value: 3, },
            { name: 'Act 4', value: 4, }
        ];
        $scope.selectedAct = $scope.acts[0];

        $scope.runs =  runStorageService.load();
        $scope.name = '';
        $scope.currentRun = null;
        
        $scope.runStarted = function() {
            return $scope.currentRun !== null;
        };

        $scope.gridOptions = {
            data: 'runs',
            columnDefs: [
                { field: 'name', displayName: 'Run name' },
                { field: 'monsterPowerLevel', displayName: 'MP' },
                { field: 'act', displayName: 'Act' },
                { field: 'startExp', displayName: 'Start exp', cellFilter: "number:0" },
                { field: 'endExp', displayName: 'End exp', cellFilter: "number:0" },
                { field: 'expPerHour', displayName: 'Exp / hour', cellFilter: "number:0" }
            ]
        };

        $scope.startRun = function() {
            var run = {
                monsterPowerLevel: $scope.selectedMonsterPowerLevel,
                act: $scope.selectedAct,
                name: $scope.name,
                startExp: $scope.startExp,
                startTime: dateService.now()
            };
            $scope.currentRun = run;
        };

        $scope.endRun = function() {
            var run = $scope.currentRun;
            run.endExp = $scope.endExp;
            run.endTime = dateService.now();
            
            var elapsedSeconds = (run.endTime - run.startTime) / 1000;
            var totalExp = run.endExp - run.startExp;
            run.expPerHour = Math.round((totalExp / elapsedSeconds) * 3600);

            if (run.name in $scope.runs) {
                $scope.runs[run.name].push(run);
            } else {
                $scope.runs[run.name] = [run];
            }

            $scope.currentRun = null;
            $scope.startExp = run.endExp;

            runStorageService.save($scope.runs);
        };

        $scope.getRunGroups = function () {
            return  _.groupBy($scope.runs, "name");
        };
    }]);