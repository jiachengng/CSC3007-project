// Api link for dengue cluster data
const apiUrl = "https://jiachengng.github.io/CSC3007-project/dataset/dengue_cluster.json";

// set the dimensions and margins of the graph
const width = 450,
  height = 450,
  margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

var north = 0;
var central = 0;
var west = 0;
var northEast = 0;
var east = 0;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.SrchResults[1].ZONE);

    for (let i = 1; i < data.SrchResults.length; i++) {
      var locationName = data.SrchResults[i].ZONE;
      var caseSize = data.SrchResults[i].CASE_SIZE;
      if (locationName === "North") {
        north = north + parseInt(caseSize);
        console.log(north)
      }
      else if (locationName === "Central") {
        central += parseInt(caseSize);
      }
      else if (locationName === "West") {
        west += parseInt(caseSize);
      }
      else if (locationName === "North East") {
        northEast += parseInt(caseSize);
      }
      else {
        east = east + parseInt(caseSize);
      }
    }

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create dummy data
    const pieChartData = { a: north, b: central, c: west, d: northEast, e: east }

    // set the color scale
    const color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(pieChartData))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('whatever')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function (d) { return (color(d.data[1])) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  });
// console.log(north)

