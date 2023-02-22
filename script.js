var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg2 = d3.select("#my_bar_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/hw-05-hw05-nick-ethan/master/data/bar-data.csv", function(bardata) {

var xx = d3.scaleBand()
  .range([ 0, width])
  .domain(bardata.map(function(d) { return d.category; }))
  .padding(0.2);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xx))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

var yy = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
svg2.append("g")
  .call(d3.axisLeft(yy));
    

svg2.selectAll("mybar")
  .data(bardata)
  .enter()
  .append("rect")
    .attr("x", function(d) { return xx(d.category); })
    .attr("y", function(d) { return yy(d.amount); })
    .attr("width", xx.bandwidth())
    .attr("height", function(d) { return height - yy(d.amount); })
    .attr("fill", "steelblue")

    
})
