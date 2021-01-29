const data = [
    {company: 'Epsilon', openings: 19 },
    {company: 'IQVIA', openings: 9 },
    {company: 'McDonalds', openings: 7 },
    {company: 'KPMG', openings: 7 },
    {company: 'PwC', openings: 6 },
    {company: 'Fetch Rewards', openings: 6 },
    {company: 'NielsenIQ', openings: 5 },
    {company: 'physIQ', openings: 5 },
    {company: 'IBM', openings: 5 },
    {company: 'Robert Half', openings: 5 },
    {company: 'The University of Chicago', openings: 4 }
];

const width = 1600;
const height = 400;
const margin = {top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-containter')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    .attr('viewBox', [0, 0, width, height]);

const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

    const y = d3.scaleLinear()
    .domain([0, 25])
    .range([height - margin.bottom, margin.top]);
   
svg
    .append('g')
    .attr('fill', 'purple')
    .selectAll('rect')
    .data(data.sort((a, b) => d3.descending(a.openings, b.openings)))
    .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', (d) => y(d.openings))
        .attr('height', d => y(0) - y(d.openings))
        .attr('width', x.bandwidth())
        .attr('class', 'rectangle')

function xAxis(g) {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].company))
    .attr('font-size', '14px')

}
function yAxis(g) {
    g.attr('transorm', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr('font-size', '14px')
}

svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
svg.node();

