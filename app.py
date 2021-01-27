from flask import Flask, render_template, jsonify, request
import pymongo
from config import app_id, app_key
from requests import get
import json
from pprint import pprint
import csv
from urllib.parse import urlparse, parse_qs
app = Flask('__name__')
app.static_folder = 'static'

# connect to db
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# create db
indeedDB = myclient["indeedDB"]
# create collection in db
jobsColl = indeedDB["jobsColl"]

# Example query string
#http://localhost:5000/?jobType=Data+Science&location=Chicago%2C+IL

@app.route('/')
def root_route():
    # Get User params
    if request.query_string:
        # Get current url qury string
        # https://docs.python.org/3/library/urllib.parse.html
        thisRequest = request.query_string.decode("utf-8")
        queriesSplit = thisRequest.split('&')
        #parsed = urlparse(request.text['current_user_url'])
        #print('parsed: ', parsed)
        #qs = parse_qs(parsed)
        #print('qs: ', qs)
        # Make dictionary of query keys and vals
        keyValDict = {}
        for s in queriesSplit:
            keyValPair = s.split('=')
            key = keyValPair[0]
            val = keyValPair[1]
            keyValDict[key] = val
        what = keyValDict['jobType']
        where = keyValDict['location']
    else:
        print('no queryString')
        what='Data Science'
        where='Chicago, IL'
    #what = what.decode("utf-8")
    #where = what.decode("utf-8")
    # Get jobs from api
    result = getJobs(what, where)
    
    # Post jobs to DB
    dataToDB(result)

    # Pull from DB
    result = dataFromDB()

    # Pass data to page
    input = {'what' : what, 'where' : where, 'data' : result}
    return render_template('index.html', input=input)

def getJobs(what, where):
    # Get parameters
    page = 1
    countryCode = 'us'
    queryType = 'search'

    # Make url
    url = f'http://api.adzuna.com/v1/api/jobs/{countryCode}/{queryType}/{page}?what={what}&where={where}&app_id={app_id}&app_key={app_key}&content-type=application/json'
    response = json.loads(get(url).text)['results']
    parsedJobs = []
    #---------------------------why use .get()?
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
            'salaryMin': salaryMin
        }
        parsedJobs.append(parsedJob)
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