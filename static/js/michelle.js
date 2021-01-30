var data = JSON.parse(d3.select('#dataScript').attr('indata'));
console.log(data)

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
var topSortedCompanyCounts = sortedCompanyCounts.slice(0,5);

  var data = [{
    x: topSortedCompanyCounts.map(obj => obj.company),
    y: topSortedCompanyCounts.map(obj => obj.count),
    type: 'bar',
    text: topSortedCompanyCounts.map(obj => obj.count),
    textposition: 'auto',
    hoverinfo: 'none',
    // opacity: 0.5,
    marker: {
      color: '#8f5db0',
      line: {
        color: '#8f5db0',
        width: 1.5
      }
    }
  }];
  
  var layout = {
    title: 'Job Postings by companies'
  };
  
  Plotly.newPlot('michelle', data, layout);
