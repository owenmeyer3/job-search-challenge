// To run, type 'flask run' in the terminal. Ctrl + click on url to open page
var data = JSON.parse(d3.select('#dataScript').attr('indata'));

var title = d3.select('#jobType').property('value');
var uniqueCompanies = new Set(data.map(obj => obj.company));

d3.select('#michelle').append('h1').text(title).attr('class','text-center display-3').append('hr');
var table = d3.select('#michelle').append('table').attr('class','table table-stripped');
table.append('thead').append('tr').append('th').text('Compay Name').append('th').append('th').text('Date').append('tbody');

data.forEach(obj => {
    var row = table.append('tr')
    Object.entries(([key,val])=>{
        if (key == 'company') {
            var cell1 = row.append('td');
            cell1.text(val)
        };
        if (key == 'createdAt') {
            var cell2 = row.append('td');
            cell2.text(val)
        };
    })
});