from flask import Flask, render_template
import pymongo
from config import app_id, app_key
from requests import get
import json
from pprint import pprint
import csv

app = Flask('__name__')
app.static_folder = 'static'
# connect to db
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# create db
indeedDB = myclient["indeedDB"]
# create collection in db
jobsColl = indeedDB["jobsColl"]

#@app.route('/<company>/<position>/<location>/<summary>')
@app.route('/')
def root_route():
    # Get User params

    # Get jobs from api
    result = getJobs()

    # Post jobs to DB
    dataToDB(result)

    # Pull from DB
    result = str(dataFromDB())

    # Pass data to page
    print('result')
    print(result)
    return render_template('index.html', data=result)



def getJobs():
    # Get parameters
    page = 1
    countryCode = 'us'
    queryType = 'search'
    page = 1
    loc0 = 'chicago'
    loc1 = 'illinois'
    loc2 = ''
    category='it-jobs'

    # Make url
    url = f'http://api.adzuna.com/v1/api/jobs/{countryCode}/{queryType}/{page}?app_id={app_id}&app_key={app_key}&content-type=application/json'
    #print('url= ' + str(url))
    response = json.loads(get(url).text)['results']
    parsedJobs = []
    for job in response:
        jobId = job.get('id')
        title = job.get('title')
        company = job.get('company').get('display_name')
        createdAt = job.get('created')
        category = job.get('category').get('label')
        lat = job.get('latitude')
        lng = job.get('longitude')
        locationName = job.get('location').get('display_name')
        locationAreaArr = job.get('location').get('area')
        salaryIsPredicted = job.get('salary_is_predicted')
        salaryMax = job.get('salary_max')
        salaryMin = job.get('salary_min')

        parsedJob = {
            'id': jobId,
            'title': title,
            'company': company,
            'createdAt': createdAt,
            'category': category,
            'lat': lat,
            'lng': lng,
            'locationName': locationName,
            'locationAreaArr': locationAreaArr,
            'salaryIsPredicted': salaryIsPredicted,
            'salaryMax': salaryMax,
            'salaryMin': salaryMin,
        }
        parsedJobs.append(parsedJob)
        print(parsedJobs)
    return parsedJobs


    
def dataToDB(data):
    # Clear Collection
    jobsColl.remove({})
    jobsColl.insert(data)

def dataFromDB():
    cursor = jobsColl.find({})
    data = []
    for record in cursor:
        data.append(record)
    return data



app.run(port = '5000', debug = True)