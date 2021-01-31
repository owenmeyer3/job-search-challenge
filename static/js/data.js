// Get data from html <script> object 'indata' param PERMANENT
var data = JSON.parse(document.currentScript.getAttribute("indata"));

// Get JSON local data TEMPORARY
// var data = d3.json("static/js/SampleData_Default.json").then(function(data){ 
 
// Fill table structure
var myDiv = d3.select('#owen');
myDiv.html('<table class="table table-striped" style="font-size:80%"></table>');

//Add table header
var myTable = myDiv.select('table');
myTable.html(`<thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Company</th>
                </tr>
            </thead>
            <tbody id="tbody"></tbody>`);

// Get table body for each job returned
var tbody = d3.select('#tbody');

// Make data rows
tbody.selectAll('tr')
    .data(data).enter()
    .append('tr')
    .html(d => 
        `<td>${d['title']}</td>
        <td>${d['company']}</td>`
    );


// Get JSON local data TEMPORARY
// });