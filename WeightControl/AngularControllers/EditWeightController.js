var weightControlApp = angular.module('weightControlApp', []);

weightControlApp.controller('EditWeightController', EditWeightController);

function EditWeightController($scope, $http) {

    var onlyNumbersRegExp = new RegExp('^[0-9]+$');

    $scope.weight = '';
    $scope.weightisInvalid = true;

    $scope.$watch('weight', function (weight) {
        if (weight == '' || onlyNumbersRegExp.test(weight) == false) {
            $scope.weightisInvalid = true;
        }
        else {
            $scope.weightisInvalid = false;
        }
    });

    $scope.weights = [];

    $scope.addWeight = function (weight) {
        $scope.weights.push(weight);
        $scope.weight = '';
    };

    $scope.saveWeights = function (callback) {
        $http({
            method: 'GET',
            url: '/'
        }).success(function(data) {
            alert(data);
        });
    };
}