# project-3
Adzuna API
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