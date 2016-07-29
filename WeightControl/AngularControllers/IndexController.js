var weightControlApp = angular.module('weightControlApp', ['ui.bootstrap']);

weightControlApp.controller('IndexController', IndexController);


function IndexController($scope, $http) {

    $scope.$watch('dt', function () {
        getAllWeights();
    });

    //DATEPICKER SECTION
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();


    $scope.formats = ['yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.datepickerOptions = {
        datepickerMode: "'year'",
        minMode: "'year'",
        minDate: "minDate",
        showWeeks: "false",
    };


    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



    init();

    function init() {
        getAllWeights();
    }

    function getAllWeights() {
        $http.get('/api/getAllWeights' + '/' + $scope.dt.getFullYear() + '/' + ($scope.dt.getMonth() + 1).toString())
            .then(function success(response) {
                $scope.allWeights = response.data.Weights;
                displayWeightTable(response.data.Weights);
                //alert(Object.keys($scope.allWeights));

            }, function error(response) {
                alert('Error');
            });
    }

    function displayWeightTable(weightData) {



        //var tableData =
        //    [
        //        [
        //            [0, 0],
        //            [0.5, 0.3],
        //            [1, 0.8]
        //        ]
        //    ]; //alert(tableData[0][1][0]); alerts '0.5'

        var options = {
            //yaxis: { max: 10 },
            grid: {
                hoverable: true,
                clickable: true
            },
            xaxis: {
                tickSize: 1,
                minTickSize: 1,
                tickDecimals: 0
            }
        }

        var tableData = [];

        Object.keys(weightData).forEach(function (element, index, array) {            // element is the date as key in the dictionairy from service
            var dateString = element.toString().split('-');
            var year = dateString[0];
            var month = dateString[1];
            var day = dateString[2];
            tableData.push([day, weightData[element]]); 
        });

        $scope.allWeights = tableData;


        //tableData[0].push([0.5, 0.5]);

        $.plot($("#placeholder"), [{
            data: tableData, label: "Gewicht"
        }], options);

        $("<div id='tooltip'></div>").css({
            position: "absolute",
            display: "none",
            border: "1px solid #fdd",
            padding: "2px",
            "background-color": "#fee",
            opacity: 0.80
        }).appendTo("body");

        $("#placeholder").bind("plothover", function (event, pos, item) {



            if (item) {

                var date = item.datapoint[0];
                var weightOnDate = item.datapoint[1];

                $("#tooltip").html(item.series.label + ' am ' + date + ': ' + weightOnDate + 'kg')
                    .css({ top: item.pageY + 5, left: item.pageX + 5 })
                    .fadeIn(200);
            } else {
                $("#tooltip").hide();
            }

        });
    }




}
