# project-3
## Adzuna API
docs(https://developer.adzuna.com/docs/historical)

request types
https://developer.adzuna.com/docs/salary

Queries
Historical Data
http://api.adzuna.com/v1/api/jobs/gb/history?app_id={YOUR API ID}
    &app_key={YOUR API KEY}
    &location0=UK
    &location1=London
    &category=it-jobs
    &content-type=application/json

Histogram data
http://api.adzuna.com/v1/api/jobs/gb/histogram
    ?app_id={YOUR API ID}
    &app_key={YOUR API KEY}
    &location0=UK
    &location1=London
    &what=finance%20officer
    &content-type=application/json

Regional Data
http://api.adzuna.com/v1/api/jobs/gb/history
    ?app_id={YOUR API ID}
    &app_key={YOUR API KEY}
    &location0=UK
    &location1=West%20Midlands
    &content-type=application/json

Top Companies
http://api.adzuna.com/v1/api/jobs/gb/top_companies
    ?app_id={YOUR API ID}
    &app_key={YOUR API KEY}
    &what=cook
    &content-type=application/json

Params and Query types
https://developer.adzuna.com/activedocs/#!/adzuna/categories
https://developer.adzuna.com/activedocs/#!/adzuna/search
https://developer.adzuna.com/docs/historical

Example result
[{
    '__CLASS__': 'Adzuna::API::Response::Job', 
    'category': {
        '__CLASS__': 'Adzuna::API::Response::Category', 
        'label': 'IT Jobs', 
        'tag': 'it-jobs'
    }, 
    'longitude': -0.132103, 
    'created': '2021-01-21T11:20:57Z', 
    'salary_is_predicted': '1', 
    'id': '1947693034', 
    'title': 'Cloud and DevOps Automation Specialist', 
    'salary_max': 48649.43, 
    'latitude': 51.7402, 
    'salary_min': 48649.43, 
    'company': {
        '__CLASS__': 'Adzuna::API::Response::Company', 
        'display_name': 'FIS'
    }, 
    'location': {
        'display_name': 'Newgate Street, Hertford', 
        'area': ['UK', 'Eastern England', 'Hertfordshire', 'Hertford', 'Newgate Street'], 
        '__CLASS__': 'Adzuna::API::Response::Location'
    }, 
    'redirect_url': 'https://www.adzuna.co.uk/jobs/land/ad/1947693034?se=phSveupc6xGlueZk4XHrKg&utm_medium=api&utm_source=2ae8e9f7&v=98A897ED2C01B9533B4F007386FAFA5BDF3C5F21', 
    'description': 'Position Type : Full time Type Of Hire : Experienced (relevant combo of work and education) Education Desired : Bachelor of Computer Science Travel Percentage : 0% Are you curious, motivated, and forward-thinking? At FIS youâ\x80\x99ll have the opportunity to work on some of the most challenging and relevant issues in financial services and technology. Our talented people empower us, and we believe in being part of a team that is open, collaborative, entrepreneurial, passionate and above all fun. Abo…', 
    'adref': 'eyJhbGciOiJIUzI1NiJ9.eyJpIjoiMTk0NzY5MzAzNCIsInMiOiJwaFN2ZXVwYzZ4R2x1ZVprNFhIcktnIn0.qhixH4KuZN1_GJ6kW12h2o_0KBKeRFNso8KnFsjiNDQ'
}]

Our parsed data
{'_id': ObjectId('600c52c72e8005b4ac7e77fc'), 
    'id': '1949272729', 
    'title': 'Amazon Warehouse Associate - Early Morning Shifts Available', 
    'company': 'Amazon Workforce Staffing', 
    'createdAt': '2021-01-22T02:26:23Z', 
    'category': 'Logistics & Warehouse Jobs', 
    'lat': 43.09816, 
    'lng': -89.32431, 
    'locationName': 'Monona, Dane County', 
    'locationAreaArr': ['US', 'Wisconsin', 'Dane County', 'Monona'], 
    'salaryIsPredicted': '0', 
    'salaryMax': None, 
'salaryMin': None}

to do:
make multiple pages searchable
simplify string passing js to python

//-------app.py
//reload page (go to page)
//grab parameters from text boxes
//query with those parameters
//gets jobs from query
//jobs to DB, jobs from database
//now we have jobs from db
//render html at localhost (with textbox params and data)

//-------file.js
//select html tag with data [d3.select('#dataScript')]
//get from tag .attr('indata)
//make data json type [JSON.parse()]
//make visualwithdata
//append visual to div