data = JSON.parse(d3.select('#dataScript').attr('indata'));

// set default top-N select
chartTitle = 'Top 5 Job Titles';
topN = 5;
generateChart();

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
            left: 45
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

    // for stored json data, un-rem line below and 2nd from bottm->"})"
    //d3.json('../static/js/SampleData_Default.json', function(error, data) {

    // pulling titles and stripping bold/strong tags
    titles = (data.map(obj => obj.title.replace('<strong>', '').replace('</strong>', '')));

    // identify unique titles
    uniqueTitles = [...new Set(titles)];

    // create an array of json objects - "pick" will select the "title" attribute from raw json (data)
    //   for "_.pick()"" function add Lodash library: 
    //      (index.html) src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js'
    titleList = [];
    data.forEach(function(d) {
        titleList.push(_.pick(d, ['title']));
    });

    // loop-count unique titles and push both to new array of json-objects, titleCounts
    titleCounts = []
    uniqueTitles.forEach(function(uniq, index) {
        count = 0
        titleList.forEach(t => {
            if (uniq === t.title.replace('<strong>', '').replace('</strong>', '')) {
                count += 1
            }
        })
        titleCounts.push({ 'title': uniq, 'freq': count })
    });

    // sort dictionary and user-select-chosen Top-N
    titleCounts = titleCounts.sort((a, b) => d3.descending(a.freq, b.freq));
    titleCounts = titleCounts.slice(0, topN);

    // scale range
    x.domain(titleCounts.map(function(d) {
        return d.title;
    }));
    y.domain([0, d3.max(titleCounts, function(d) {
        return d.freq;
    })]);

    // set x-axis
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

    // set y-axis
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('x', 200)
        .attr('y', -45)
        .attr('dy', '1em')
        .text(chartTitle)
        .style('font-size', '15pt');
    // mouseover
    tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .style('font-size', '10pt')
        .html(function(d) {
            return "<span style='color:white'>" + d.title +
                "</span><br/>count: <span style='color:white'>" + d.freq + "</span>";
        })
    svg.call(tip);
    // bar chart
    svg.selectAll('bar')
        .data(titleCounts)
        .enter().append('rect')
        .style('width', function(d) { return x(d) + 'px'; })
        .text(function(d) { return d; })
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x(d.title);
        })
        .attr('width', x.rangeBand())
        .attr('y', function(d) {
            return y(d.freq);
        })
        .attr('height', function(d) {
            return height - y(d.freq);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        //});
}