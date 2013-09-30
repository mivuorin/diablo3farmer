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

        $scope.startRun = function () {
            var run = new Run($scope.name, $scope.selectedMonsterPowerLevel, $scope.selectedAct);
            run.start($scope.startExp, dateService.now());
            $scope.currentRun = run;
            $scope.endExp = $scope.startExp;
        };

        $scope.endRun = function() {
            var run = $scope.currentRun;
            run.end($scope.endExp, dateService.now());

            if (run.name in $scope.runs) {
                $scope.runs[run.name].push(run);
            } else {
                $scope.runs[run.name] = [run];
            }

            runStorageService.save($scope.runs);
            
            $scope.currentRun = null;
            $scope.startExp = $scope.endExp;
        };

        $scope.getRunNames = function () {
            return _.keys($scope.runs);
        };
    }]);