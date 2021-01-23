var rawData = document.currentScript.getAttribute("indata")
var data = decodeURIComponent(JSON.parse('"'+rawData+'"'));
console.log(data)
var dataObj = JSON.parse(data)
console.log(dataObj)

