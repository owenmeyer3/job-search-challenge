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

Params
https://developer.adzuna.com/activedocs/#!/adzuna/categories

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