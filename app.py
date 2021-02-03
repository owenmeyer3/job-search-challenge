from flask import Flask, render_template, request
import pymongo
from config import app_id, app_key
from requests import get
import json
app = Flask('__name__')
app.static_folder = 'static'

# connect to db
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# create db
adzunaDB = myclient["adzunaDB"]
# create collection in db
jobsColl = adzunaDB["jobsColl"]

@app.route('/')
def root_route():
    # Get User params (Otherwise fill with default)
    if request.query_string:
        what=request.args.get('jobType')
        where=request.args.get('location')
        distanceMiles=int(request.args.get('distanceMiles'))
    else:
        print('no queryString')
        what='Salon'
        where='Chicago, IL'
        distanceMiles=3

    # Get jobs from api
    result = getJobs(what, where, distanceMiles)
    
    # Post jobs to DB
    dataToDB(result)

    # Pull from DB
    result = dataFromDB()

    # Pass data to page
    input = {'what' : what, 'where' : where, 'distanceMiles' : distanceMiles, 'data' : result}
    return render_template('index.html', input=input)

def getJobs(what, where, distanceMiles):
    # Get parameters
    countryCode = 'us'
    queryType = 'search'
    distanceKM = distanceMiles * 1.61

    # Query each job page of search (if page does not exist, end query and move on)
    jobs = []
    page = 1
    while(page):
        try:
            url = f'http://api.adzuna.com/v1/api/jobs/{countryCode}/{queryType}/{page}?what={what}&where={where}&distance={distanceKM}&app_id={app_id}&app_key={app_key}&content-type=application/json'
            print(url)
            response = json.loads(get(url).text)['results']
            print(response)
            if response:
                jobs += response
                page += 1
            else:
                page = 0
        except:
            print('query failed')
            page = 0
    
    # Parse each job
    parsedJobs = []
    for job in jobs:
        parsedJob = {
            'id': job.get('id'),
            'title': job.get('title'),
            'company': job.get('company').get('display_name'),
            'createdAt': job.get('created'),
            'category': job.get('category').get('label'),
            'lat': job.get('latitude'),
            'lng': job.get('longitude'),
            'locationName': job.get('location').get('display_name'),
            'locationAreaArr': job.get('location').get('area'),
            'salaryIsPredicted': job.get('salary_is_predicted'),
            'salaryMax': job.get('salary_max'),
            'salaryMin': job.get('salary_min'),
            'redirect_url': job.get('redirect_url'),
            'description': job.get('description')
        }
        parsedJobs.append(parsedJob)
    # return list of parsed jobs
    return parsedJobs

def dataToDB(data):
    # Clear Collection
    jobsColl.remove({})
    # Insert job data to jobs collection
    if(data):
        jobsColl.insert(data)

def dataFromDB():
    # Get cursor object to collection
    cursor = jobsColl.find({}, {'_id':0})
    # Make json type data from cursor
    data = []
    for record in cursor:
        data.append(record)
    return data

app.run(port = '5000', debug = True)