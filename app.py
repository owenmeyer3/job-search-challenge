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
indeedDB = myclient["indeedDB"]
# create collection in db
jobsColl = indeedDB["jobsColl"]

@app.route('/')
def root_route():
    # Get User params
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
    print('jobs returned: ', len(result))
    
    # Post jobs to DB
    dataToDB(result)

    # Pull from DB
    result = dataFromDB()

    # Pass data to page
    input = {'what' : what, 'where' : where, 'distanceMiles' : distanceMiles, 'data' : result}
    return render_template('index.html', input=input)

def getJobs(what, where, distanceMiles):
    print('DM: ', distanceMiles)
    # Get parameters
    page = 1
    countryCode = 'us'
    queryType = 'search'
    distanceKM = distanceMiles * 1.61
    print('DK: ', distanceKM)

    # Query each job page of search (if page does not exist, end query and move on)
    jobs = []
    while(page):
        try:
            url = f'http://api.adzuna.com/v1/api/jobs/{countryCode}/{queryType}/{page}?what={what}&where={where}&distance={distanceKM}&app_id={app_id}&app_key={app_key}&content-type=application/json'
            response = json.loads(get(url).text)['results']
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
            'salaryMin': job.get('salary_min')
        }
        parsedJobs.append(parsedJob)
    # return list of parsed jobs
    return parsedJobs

def dataToDB(data):
    # Clear Collection
    jobsColl.remove({})
    if(data):
        jobsColl.insert(data)

def dataFromDB():
    cursor = jobsColl.find({}, {'_id':0})
    data = []
    for record in cursor:
        data.append(record)
    return data

app.run(port = '5000', debug = True)