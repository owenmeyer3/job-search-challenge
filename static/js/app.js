var location0 = 'UK';
var location1 = 'London';
var category = 'it-jobs';
var content_type = 'application/json';

var requestURL = `http://api.adzuna.com/v1/api/jobs/gb/history\
?app_id=${app_id}\
&app_key=${app_key}\
&location0=${location0}\
&location1=${location1}\
&category=${category}\
&content-type=${content_type}`;

console.log(requestURL);
d3.json(requestURL).then(function(data){
    console.log(data);
});