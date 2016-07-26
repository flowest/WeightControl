var weightControlApp = angular.module('weightControlApp', ['pickadate']);

weightControlApp.controller('EditWeightController', EditWeightController);


function EditWeightController($scope, $http) {

    init();

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

    $scope.$watch('date', function() {
        checkForWeightOnDate();
    });


    $scope.saveWeight = function () {

        $http.post('/api/weightsEdited',
        {
            WeightEdited: $scope.weight,
            Date: $scope.date,

        });
    };

    function init() {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();

        $scope.date = year + '-' + month + '-' + day;

        checkForWeightOnDate();
    }

    function checkForWeightOnDate() {
        $http.get('/api/checkForWeight/' + $scope.date)
            .then(function success(response) {
                $scope.weight = response.data;
            }, function error(response) {
                $scope.weight = '';
            });
    }
}
