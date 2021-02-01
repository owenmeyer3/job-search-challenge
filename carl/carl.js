data = JSON.parse(d3.select('#dataScript').attr('indata'));

var chartTitle = 'Top 5 Job Titles';
var topN = 5;
generateChart();

// top-N select
function onSelect() {
    topN = document.getElementById('topN').value;
    chartTitle = 'Top ' + topN + ' Job Titles';
    d3.select('#chart').select('svg').remove();
    generateChart();
}
// set margins
function generateChart() {
    margin = {
            top: 40,
            right: 20,
            bottom: 70,
            left: 40
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // set the ranges
    x = d3.scale.ordinal().rangeRoundBands([0, width], .2);
    y = d3.scale.linear().range([height, 5]);

    // define axis
    xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');
    yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(6);
    // add SVG element
    svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
            `translate(${margin.left},${margin.top})`);

    // for stored json data
    // d3.json('static/js/SampleData_Default.json', function(error, data) {

    // identify unique titles
    titles = (data.map(obj => obj.title.replace('<strong>', '')));
    uniqueTitles = [...new Set(titles)];
    titlelist = [];

    data.forEach(function(d) {
        titlelist.push(_.pick(d, ['title']));
    });

    // identify counts of unique titles
    titleCounts = []
    uniqueTitles.forEach(function(uniq, index) {
        count = 0
        titlelist.forEach(t => {
            if (uniq === t.title) {
                count += 1
            }
        })
        titleCounts.push({ 'title': uniq, 'Freq': count })
    });

    // sort and select chosen Top-N
    titleCounts = titleCounts.sort((a, b) => d3.descending(a.Freq, b.Freq));
    titleCounts = titleCounts.slice(0, topN);

    // scale range
    x.domain(titleCounts.map(function(d) {
        return d.title;
    }));
    y.domain([0, d3.max(titleCounts, function(d) {
        return d.Freq;
    })]);

    // set axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'middle')
        .style('font-size', '10pt')
        .attr('dx', '1em')
        .attr('dy', '1em')
        .attr('transform', 'rotate(12)');

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('x', 200)
        .attr('y', -45)
        .attr('dy', '1em')
        .text(chartTitle)
        .style('font-size', '15pt');

    // Add bar chart
    svg.selectAll('bar')
        .data(titleCounts)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x(d.title);
        })
        .attr('width', x.rangeBand())
        .attr('y', function(d) {
            return y(d.Freq);
        })
        .attr('height', function(d) {
            return height - y(d.Freq);
        })
        //});

}