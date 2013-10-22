'use strict';

angular.module('Diablo3Farmer.Controllers', [])
    .controller('FarmRunController', ['$scope', 'dateService', 'runStorageService', 'paragonLevelService', function($scope, dateService, runStorageService, paragonLevelService) {

        $scope.monsterPowerLevels = ['MP01', 'MP02', 'MP03', 'MP04', 'MP05', 'MP06', 'MP07', 'MP08', 'MP09', 'MP10'];

        $scope.acts = [
            { name: 'Act 1', value: 1, },
            { name: 'Act 2', value: 2, },
            { name: 'Act 3', value: 3, },
            { name: 'Act 4', value: 4, }
        ];

        $scope.levels = paragonLevelService.getLevels();
        $scope.startLevel = $scope.levels[0];
        $scope.endLevel = $scope.levels[0];

        $scope.runs = runStorageService.load();
        $scope.run = new Run('', $scope.monsterPowerLevels[0], $scope.acts[0]); // TODO untested code. should use factory to create run? or load previous run from storage
        
        $scope.startRun = function() {
            $scope.run.start(dateService.now());
            
            // TODO move logic to run?
            $scope.run.endExp = $scope.run.startExp;
            $scope.essences = 0;
            $scope.tears = 0;
            
            $scope.endLevel = $scope.startLevel;
        };

        $scope.endRun = function () {
            $scope.run.expFromLevels = paragonLevelService.getRequiredExp($scope.startLevel, $scope.endLevel);
            $scope.run.end(dateService.now(), $scope.essences, $scope.tears);

            // Save copy of binded run
            $scope.runs.push(angular.copy($scope.run));
            runStorageService.save($scope.runs);

            // TODO move logic to run?
            $scope.run.startExp = $scope.run.endExp;     
            $scope.endLevel = $scope.startLevel;
        };

        $scope.getRunNames = function() {
            var groups = _.groupBy($scope.runs, function(run) {
                return run.name;
            });
            return _.keys(groups);
        };

        $scope.removeRun = function(_run) {
            $scope.runs.splice($scope.runs.indexOf(_run), 1);
            runStorageService.save($scope.runs);
        };
    }]);