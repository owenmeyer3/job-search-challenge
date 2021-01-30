// Top Companies: https://api.adzuna.com/v1/api/jobs/us/top_companies?app_id=86767575&app_key=adc9c2040851b81df96181b91cfc65a1&what=Data%20Science&location0=Chicago
// Categories:  http://api.adzuna.com/v1/api/jobs/gb/categories?app_id={YOUR API ID}&app_key={YOUR API KEY}&&content-type=application/json
// Salary: http://api.adzuna.com/v1/api/jobs/gb/history?app_id={YOUR API ID}&app_key={YOUR API KEY}&location0=UK&location1=London&category=it-jobs&content-type=application/json
// data = JSON.parse(d3.select('#dataScript').attr('indata'));

margin = {
        top: 40,
        right: 20,
        bottom: 70,
        left: 40
    },
    width = 800 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
// set the ranges
x = d3.scale.ordinal().rangeRoundBands([0, width], .2);
y = d3.scale.linear().range([height, 5]);

// define the axis
xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(6);
// add the SVG element
svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
        `translate(${margin.left},${margin.top})`);

// load the data
d3.json('data.json', function(error, data) {

    data.forEach(function(d) {
        d.Company = d.Company;
        d.Freq = +d.Freq;
    });

    // scale the range of the data
    x.domain(data.map(function(d) {
        return d.Company;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.Freq;
    })]);

    // add axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'center')
        .attr('dx', '0em')
        .attr('dy', '1em')
        .attr('transform', 'rotate(0)');

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('y', -25)
        .attr('dy', '1em')
        .text('Top 5 Hiring Companies');

    // Add bar chart
    svg.selectAll('bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x(d.Company);
        })
        .attr('width', x.rangeBand())
        .attr('y', function(d) {
            return y(d.Freq);
        })
        .attr('height', function(d) {
            return height - y(d.Freq);
        })
})