// Get data from html <script> object 'indata' param
var data = JSON.parse(document.currentScript.getAttribute("indata"));


var myDiv = d3.select('#owen');
myDiv.html('<table></table>')
var myTable = myDiv.select('table')
myTable.html(`<tr>
                <th>Title</th>
                <th>Company</th>
                <th>Latitide</th>
                <th>Longitude</th>
                <th>Location Name</th>
            </tr>`)

// Make table for each job returned
myTable
    .selectAll('tr')
    .data(data).enter()
    .append('tr')
    .html(d => 
        `<td>${d['title']}</td>
        <td>${d['company']}</td>
        <td>${d['lat']}</td>
        <td>${d['lng']}</td>
        <td>${d['locationName']}</td>`
    )
