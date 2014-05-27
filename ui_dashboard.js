//Module cavaDots
var uiDashboard = (function ($) {

    var panel01,
        panel02,
        mainNav,
        ctx,
        ctx2,
        ctx3,
        myNewChart1,
        myNewChart2,
        myNewChart3,


        dataChart01 = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [10, 59, 90, 81, 56, 55, 40]
            }, {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        },

        dataChart02 = [{
            value: 30,
            color: "#F38630"
        }, {
            value: 50,
            color: "#E0E4CC"
        }, {
            value: 100,
            color: "#69D2E7"
        }],

        dataChart03 = [{
                value: 30,
                color: "#F7464A"
            }, {
                value: 50,
                color: "#E2EAE9"
            }, {
                value: 100,
                color: "#D4CCC5"
            }, {
                value: 40,
                color: "#949FB1"
            }, {
                value: 120,
                color: "#4D5360"
            }

        ],



        //Module private config vars
        config = {},

        init = function () {

            if ($('#myChart01').length === 0) {
                return false;
            }

            //Get context with jQuery - using jQuery's .get() method.
            ctx = $("#myChart01").get(0).getContext("2d");
            ctx2 = $("#myChart02").get(0).getContext("2d");
            ctx3 = $("#myChart03").get(0).getContext("2d");
            //This will get the first returned node in the jQuery collection.
            myNewChart1 = new Chart(ctx).Line(dataChart01);
            myNewChart2 = new Chart(ctx2).Pie(dataChart02);
            myNewChart3 = new Chart(ctx3).Doughnut(dataChart02);

        };

    return {
        //sets to public scope
        init: init
    }



})(jQuery);

// Document ready init
$(uiDashboard.init);