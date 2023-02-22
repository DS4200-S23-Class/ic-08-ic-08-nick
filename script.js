// Load data from CSV file and create chart
d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/ic-08-ic-08-nick/master/data/data.csv", function(data) {
  // Convert JSON data to an array
  var bardata = [];

  for (var i = 0; i < data.length; i++) {
    bardata.push(parseFloat(data[i].value));
  }

  // Create chart
  var margin = { top: 30, right: 30, bottom: 40, left:50 }
  var width = 400 - margin.left - margin.right;
  var height = 250 - margin.top - margin.bottom;

  var tempColor;

  var colors = d3.scaleLinear()
      .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
      .range(['#B58929','#C61C6F', '#268BD2', '#85992C'])

  var yScale = d3.scaleLinear()
      .domain([0, d3.max(bardata)])
      .range([0, height]);

  var xScale = d3.scaleBand()
      .domain(bardata)
      .paddingInner(.1)
      .paddingOuter(.1)
      .range([0, width])

  var tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0)

  var myChart = d3.select('#my_bar_dataviz').append('svg')
      .style('background', '#E7E0CB')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
      .selectAll('rect').data(bardata)
      .enter().append('rect')
          .style('fill', function(d,i) {
              return colors(i);
          })
          .attr('width', xScale.bandwidth)
          .attr('height', function(d) {
              return yScale(d);
          })
          .attr('x', function(d,i) {
              return xScale(d);
          })
          .attr('y', function(d) {
              return height - yScale(d);
          })

          .on('mouseover', function(d) {
              tooltip.transition().duration(200)
                  .style('opacity', .9)
              tooltip.html(d)
                  .style('left', (d3.event.pageX -35) + 'px')
                  .style('top', (d3.event.pageY -30) + 'px')
              tempColor = this.style.fill;
              d3.select(this)
                  .style('opacity', .5)
                  .style('fill', 'yellow')
          })

          .on('mouseout', function(d) {
              d3.select(this)
                  .style('opacity', 1)
                  .style('fill', tempColor)
          })
})
