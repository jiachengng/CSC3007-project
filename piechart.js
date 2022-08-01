// Api link for dengue cluster data
const apiUrl = "https://jiachengng.github.io/CSC3007-project/dataset/dengue_cluster.json";

// set the dimensions and margins of the graph
const width = 1000,
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
        // console.log(north)
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

    console.log(north)
    console.log(northEast)
    console.log(east)
    console.log(west)
    console.log(central)

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
      .range(["orange", "red", "green", "blue", "pink"])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(pieChartData))

    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function (d, i) {
        return (
          "<strong>Number of Cases: </strong>" + "<span style='color:red'>" +
          i.value +
          "</span>"
        );
      });
    svg.call(tip);

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip.style("opacity", 1);
      d3.select(this)
        .style("stroke", "red")
        .style("opacity", 1)
        .style("stroke-width", 3);
    };
    var mousemove = function (d, i) {
      var pos = d3.select(this).node().getBoundingClientRect(); // get moouse postion
      Tooltip.html("Total Crimes: " + i.value)
        .style("left", `${window.pageXOffset + pos["x"] - 50}px`)
        .style("right", `${window.pageyOffset + pos["x"] - 50}px`);
      // .style("left", d3.mouse(this)[0] + 70 + "px")
      // .style("top", d3.mouse(this)[1] + "px");
    };
    var mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };

    svg.append("circle").attr("cx",200).attr("cy",30).attr("r", 6).style("fill", "green")
    svg.append("circle").attr("cx",200).attr("cy",50).attr("r", 6).style("fill", "orange")
    svg.append("circle").attr("cx",200).attr("cy",70).attr("r", 6).style("fill", "pink")
    svg.append("circle").attr("cx",200).attr("cy",90).attr("r", 6).style("fill", "blue")
    svg.append("circle").attr("cx",200).attr("cy",110).attr("r", 6).style("fill", "red")
    svg.append("text").attr("x", 220).attr("y", 30).text("West").style("font-size", "15px").style('fill', 'darkOrange').attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 50).text("North").style("font-size", "15px").style('fill', 'darkOrange').attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 70).text("East").style("font-size", "15px").style('fill', 'darkOrange').attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 90).text("North East").style("font-size", "15px").style('fill', 'darkOrange').attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 110).text("Central").style("font-size", "15px").style('fill', 'darkOrange').attr("alignment-baseline","middle")

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
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)


  });
// console.log(north)

