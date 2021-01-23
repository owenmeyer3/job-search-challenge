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

## Indeed (crawl)
* remote, remotejob=032b3046-06a3-4876-8dfd-474eb5e7ed11
* remote for covid, remotejob=7e3167e4-ccb4-49cb-b761-9bae564a0a63
* what, searchString+$xx,000
* jobTypes, fulltime, parttime, contract, temporary, intern, commission
* rbc ex: Domino%27s
* jcid ex: 788a7fd79eec1d60
* explvl: entry_level, mid_level, senior_level

https://www.indeed.com/jobs
    ?q=${what}
    &l=${where}
    &fromage=${daysAgoPosted}
    &remotejob=${remoteCode}
    &jt=${jobType}
    &rbc=${companyName}
    &jcid=${companyId}
    &explvl=${explvl}