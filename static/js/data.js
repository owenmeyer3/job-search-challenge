var data = JSON.parse(document.currentScript.getAttribute("indata"));
console.log('data')
console.log(data)


//d3.select('#jobType')


d3.select('#map')
    .selectAll('div')
    .data(data).enter()
    .append('div')
    .html(d => 
        `<table>
            <tr>
                <th>Id</th>
                <th>${d['id']}</th>
            </tr>
            <tr>
                <td>Title</td>
                <td>${d['title']}</td>
            </tr>
            <tr>
                <td>Company</td>
                <td>${d['company']}</td>
            </tr>  
        </table>`)
