var weightControlApp = angular.module('weightControlApp', []);

weightControlApp.controller('IndexController', IndexController);


function IndexController($scope, $http) {

    //$scope.allWeights = [[], []];

    $scope.test = 0;

    init();

    function init() {
        getAllWeights();
    }

    function getAllWeights() {
        $http.get('/api/getAllWeights')
            .then(function success(response) {
                $scope.allWeights = response.data.Weights;
                displayWeightTable(response.data.Weights);
                //alert(Object.keys($scope.allWeights));

            }, function error(response) {
                alert('Error');
            });
    }

    function displayWeightTable(weightData) {

        var options = {
            //yaxis: { max: 10 },
            grid: {
                hoverable: true,
                clickable: true
            },
        }

        //var tableData =
        //    [
        //        [
        //            [0, 0],
        //            [0.5, 0.3],
        //            [1, 0.8]
        //        ]
        //    ]; //alert(tableData[0][1][0]); alerts '0.5'

        var tableData = [];

        Object.keys(weightData).forEach(function (element, index, array) {            // element is the date as key in the dictionairy from service
            tableData.push([index, weightData[element]]);
        });

        //tableData[0].push([0.5, 0.5]);

        $.plot($("#placeholder"), [{data: tableData, label: "Gewicht" }], options);

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

                $("#tooltip").html(item.series.label + ' am ' + date + ': ' + weightOnDate)
                    .css({ top: item.pageY + 5, left: item.pageX + 5 })
                    .fadeIn(200);
            } else {
                $("#tooltip").hide();
            }

        });
    }

}
