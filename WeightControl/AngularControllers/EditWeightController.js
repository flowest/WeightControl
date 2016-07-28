var weightControlApp = angular.module('weightControlApp', ['pickadate']);

weightControlApp.controller('EditWeightController', EditWeightController);


function EditWeightController($scope, $http) {

    init();

    var onlyNumbersRegExp = new RegExp('^[0-9]+$');

    $scope.weight = '';
    $scope.weightisInvalid = true;
    $scope.weightExistsOnDate = false;

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

        $http.post('/api/weightInput',
        {
            WeightInput: $scope.weight,
            Date: $scope.date,

        }).success(function succes() {
            toastr.success('Dein Eintrag wurde gespeichert', 'Erfolg!');
            $scope.weightExistsOnDate = true;
        });
    };

    $scope.editWeight = function() {
        $http.post('/api/editWeight',
        {
            WeightInput: $scope.weight,
            Date: $scope.date
        }).success(function() {
            toastr.warning('Dein Eintrag wurde bearbeitet', 'Erfolg!');
            checkForWeightOnDate();
        });
    }

    function init() {

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

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
                $scope.weight = response.data.Weight;
                $scope.weightExistsOnDate = true;

            }, function error(response) {
                $scope.weight = '';
                $scope.weightExistsOnDate = false;
            });
    }
}
