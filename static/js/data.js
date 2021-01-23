var rawData = document.currentScript.getAttribute("indata")
var decodeData = decodeURIComponent(JSON.parse('"'+rawData+'"'));
str = decodeData.substring(1, 3);
//str = decodeData.substring(1, decodeData.length - 1);
console.log(str)
//var data = JSON.parse(JSON.parse('"'+decodeData+'"'))
//console.log(data[0])

// d3.select('#panel1')
//     .selectAll('div')
//     .data(data).enter()
//     .append('div')
//     .html(
//         d => `<table>
//             <tr>
//                 <th>Id</th>
//                 <th>${d['id']}</th>
//             </tr>
//             <tr>
//                 <td>Title</td>
//                 <td>${d['title']}</td>
//             </tr>
//             <tr>
//                 <td>Company</td>
//                 <td>${d['company']}</td>
//             </tr>  
//         </table>`)
