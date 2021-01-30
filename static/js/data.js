// Get data from html <script> object 'indata' param
var data = JSON.parse(document.currentScript.getAttribute("indata"));


var myDiv = d3.select('#owen');
myDiv.html('<table class="table table-striped"></table>');

var myTable = myDiv.select('table');
myTable.html(`<thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Company</th>
                    <th scope="col">Location Name</th>
                </tr>
            </thead>
            <tbody id="tbody"></tbody>`);

// Make table for each job returned
var tbody = myDiv.select('#tbody');

tbody.selectAll('tr')
    .data(data).enter()
    .append('tr')
    .html(d => 
        `<td>${d['title']}</td>
        <td>${d['company']}</td>
        <td>${d['locationName']}</td>`
    );
