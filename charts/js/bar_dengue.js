year = []
year_data = []

weekly_csv = ["2012-weekly-dengue.csv", "2013-weekly-dengue.csv", "2014-weekly-dengue.csv", "2015-weekly-dengue.csv", "2016-weekly-dengue.csv", "2017-weekly-dengue.csv", "2018-weekly-dengue.csv", "2019-weekly-dengue.csv", "2020-weekly-dengue.csv", "2021-weekly-dengue.csv"]

// Bar Chart initialize
var canvas = document.getElementById("barChart");
var ctx = canvas.getContext('2d');

var chartType = 'bar';
var myBarChart;

Chart.defaults.global.defaultFontColor = 'grey';
Chart.defaults.global.defaultFontSize = 16;

// Load yearly cluster data
function display_yearly() {
    Promise.all([d3.csv("dataset/Yearly-Case.csv")]).then(data => {

        // Data successfully loaded
        // console.log(data[0][0]);
        year = []
        year_data = []

        for (var i = 0; i < data[0].length; i++) {
            year.push(data[0][i].year);
            year_data.push(data[0][i].total);
        }
        initialize_chart(year, year_data);
    })
}

// console.log(year);
// console.log(year_data);
display_yearly();

// Initial chart for yearly dataset
function initialize_chart(year, year_data) {
    var bar_data = {
        // Label from year
        labels: year,
        datasets: [{
            label: "Cases Reported",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(0,255,0,0.4)",
            borderColor: "green", // The main line color
            borderCapStyle: 'square',
            pointBorderColor: "white",
            pointBackgroundColor: "green",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "yellow",
            pointHoverBorderColor: "green",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            // Year Data
            data: year_data,
            spanGaps: true,
        }]
    };
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            fontSize: 18,
            display: true,
            text: 'Dengue (yearly)',
            position: 'bottom'
        },
        onClick: function(evt) {
            var element = myBarChart.getElementAtEvent(evt);
            // console.log("hi");
            // console.log(element[0]._index);
            retrieve_weekly(weekly_csv[element[0]._index]);
            var backbtn = document.getElementById("bar_back");
            backbtn.style.display = "block";
            // if (element.length > 0) {
            //     var ind = element[0]._index;
            // }
        }
    };

    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: bar_data,
        options: options
    });

}
// Retrieve weekly dataset
function retrieve_weekly(csvpath) {
    // Load yearly cluster data
    Promise.all([d3.csv("dataset/" + csvpath)]).then(data => {

        // Data successfully loaded
        // console.log(data[0][0]);

        var weekly_label = []
        var weekly_cases = []

        // Get the year
        title_label = data[0][0].week.slice(0, 4);

        for (var i = 0; i < data[0].length; i++) {

            weekly_label.push(data[0][i].week.slice(5));
            weekly_cases.push(data[0][i].cases);
        }

        // Destroy the initial chart
        myBarChart.destroy();

        //Initialize the new chart
        var weekly_data = {
            // Label from year
            labels: weekly_label,
            datasets: [{
                label: "Cases Reported",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(0,255,0,0.4)",
                borderColor: "green", // The main line color
                borderCapStyle: 'square',
                pointBorderColor: "white",
                pointBackgroundColor: "green",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "yellow",
                pointHoverBorderColor: "green",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                // Weekly Data
                data: weekly_cases,
                spanGaps: true,
            }]
        };
        var options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        stepSize: 5,
                        maxTicksLimit: 13
                    }
                }]
            },
            title: {
                fontSize: 18,
                display: true,
                text: 'Year ' + title_label + ' Dengue Cases (Weekly)',
                position: 'bottom'
            }
        };

        myBarChart = new Chart(ctx, {
            type: 'line',
            data: weekly_data,
            options: options
        });

    })
}
// User toggle back to year
function back_year() {
    myBarChart.destroy();
    display_yearly();
    var backbtn = document.getElementById("bar_back");
    backbtn.style.display = "none";
}




// init();

// function init() {
//     myBarChart = new Chart(ctx, {
//         type: chartType,
//         data: bar_data,
//         options: options
//     });
// }

// function toggleChart() {
//     myBarChart.destroy();
//     this.chartType = (this.chartType == 'bar') ? 'line' : 'bar';
//     init();
// }