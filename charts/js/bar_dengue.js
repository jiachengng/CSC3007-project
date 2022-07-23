year = []
year_data = []

// Bar Chart initialize
var canvas = document.getElementById("barChart");
var ctx = canvas.getContext('2d');

var chartType = 'bar';
var myBarChart;

Chart.defaults.global.defaultFontColor = 'grey';
Chart.defaults.global.defaultFontSize = 16;

// Load yearly cluster data
Promise.all([d3.csv("dataset/Yearly-Case.csv")]).then(data => {

    // Data successfully loaded
    console.log(data[0][0]);

    for (var i = 0; i < data[0].length; i++) {
        year.push(data[0][i].year);
        year_data.push(data[0][i].total);
    }
    initialize_chart(year, year_data);
})

console.log(year);
console.log(year_data);

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
        }
    };

    myBarChart = new Chart(ctx, {
        type: chartType,
        data: bar_data,
        options: options
    });

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