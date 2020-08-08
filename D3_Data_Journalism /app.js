// @TODO: YOUR CODE HERE!
//Notes:
//You need to create a scatter plot between two of the data variables 
//create a scatter plot that represents each state with circle elements.  
//Your scatter plot should ultimately appear like the image at the top of this section.
// Include state abbreviations in the circles.
//Create and situate your axes and labels to the left and bottom of the chart.
//You'll need to use `python -m http.server` to run the visualization. 
//This will host the page at `localhost:8000` in your web browser.

//Set Pararameters of Plots/ SVG Area
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

//subtract margins 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append an SVG to hold the Chart
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("data.csv").then(function(data) {

    // Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });

    // Create scale functions
    // ==============================
    //xLinear Scale function above csv import 
    var xLinearScale = d3.scaleLinear()
      .domain([10, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // ==============================
    chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    
    chartGroup.append("g")
    .call(leftAxis);

    // Create and Append Initial Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "purple")
    .attr("opacity", ".5");

//text in circles 
var text = chartGroup.append("g").selectAll("text")
.data(data)
.enter()
.append("text")
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("dy", ".35em")
.text(d => d.abbr)
.attr("text-anchor", "middle")
.attr("font-family", "sans-serif")
.attr("font-size", "10px")
.attr("fill", "white")
.attr("font-weight", "700");

    // Create axes labels
    //X axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Healthcare)");
  }).catch(function(error) {
    console.log(error);
  });
