var data = JSON.parse(d3.select('#dataScript').attr('indata'));
console.log(data)
// this is the code I created independently that uses another html file
// how do I use data from our source and get the same results?

const data1 = [
    {company: 'Epsilon', openings: 19 }, //'Epsilon
    {company: 'IQVIA', openings: 9 }, //'IQVIA
    {company: 'Epsilon', openings: 7 },
    {company: 'KPMG', openings: 7 },
    {company: 'PwC', openings: 6 },
    {company: 'Fetch Rewards', openings: 6 },
    {company: 'Epsilon', openings: 5 },
    {company: 'physIQ', openings: 5 },
    {company: 'IBM', openings: 5 },
    {company: 'Robert Half', openings: 5 },
    {company: 'The University of Chicago', openings: 4 }
];

// gets all the companies for each job
var companies = (data.map(obj => obj.company));
console.log(companies);
// this gets the unique companies
var uniqueCompanies = [... new Set(companies)];
console.log(uniqueCompanies);

var companyCounts = []
uniqueCompanies.forEach(uniqueCompany=>{
    var count = 0
    companies.forEach(company => {
        if (uniqueCompany == company){
            count+=1
        }  
    })
    companyCounts.push({'company':uniqueCompany, 'count':count})
})
var sortedCompanyCounts = companyCounts.sort((a, b) => d3.descending(a.count, b.count));
var topCompanyInt = 10
var topSortedCompanyCounts = sortedCompanyCounts.slice(0,topCompanyInt)
console.log(topSortedCompanyCounts)

const width = 1600;
const height = 400;
const margin = {top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#michelle')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    //.attr('viewBox', [0, 0, width, height]);

const x = d3.scaleBand()
    .domain(d3.range(topSortedCompanyCounts.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);


const y = d3.scaleLinear()
    .domain([0, 25])
    .range([height - margin.bottom, margin.top]);
   
svg
    .append('g')
    .attr('fill', 'purple')
    .selectAll('rect')
    .data(topSortedCompanyCounts)
    .join('rect')
        .attr('x', (d) => x(d.company))
        .attr('y', (d) => y(d.count))
        .attr('height', d => y(0) - y(d.count))
        .attr('width', x.bandwidth())
        .attr('class', 'rectangle')

function xAxis(g) {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
    //.call(d3.axisBottom(x).tickFormat(i => data[i].company))
    //.attr('font-size', '14px')

}
function yAxis(g) {
    g.attr('transform', `translate(${margin.left}, 0)`)
        // .call(d3.axisLeft(y).ticks(null, data.format))
        // .attr('font-size', '14px')
}

svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
// svg.node();