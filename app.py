from flask import Flask, render_template
import pymongo
from splinter import Browser

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

    # Get jobs from page
    result = scrape()

    # Post jobs to DB
    # dataToDB(result)

    # Pull from DB
    # data = dataFromDB()

    # Pass data to page
    return render_template('index.html', data=result)

app.run(port = '5000', debug = True)

def scrape():
    # Setup splinter
    executable_path = {'executable_path' : 'C:/chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless = False)

    # Get parameters
    what = 'data science'
    where = 'Chicago, IL'
    daysAgoPosted = 7
    remoteCode = ''
    jobType = ''
    companyName = ''
    companyId = ''
    explvl = ''

    # Make url
    url = f'https://www.indeed.com/jobs?q={what}&l={where}&fromage={daysAgoPosted}&remotejob={remoteCode}&jt={jobType}&rbc={companyName}&jcid={companyId}&explvl={explvl}'
    print('url= ' + str(url))

    # Load page into browser
    browser.visit(url)

    # Find tag for first news headline
    if browser.is_element_present_by_css('td[id="resultsCol"]', wait_time=5):
        cards = browser.find_by_css('div.jobsearch-SerpJobCard')
        print('numJobs= ' + str(len(cards)))
        scrape_results = []
        for card in cards:
            scrape_result = {}
            title = card.find_by_css('h2.title a').text
            sjcl = card.find_by_css('div.sjcl')
            company = sjcl.find_by_css('span.company').text
            location = sjcl.find_by_css('.location').text
            summary = card.find_by_css('.summary').text
            scrape_result.update({'title':title, 'company':company, 'location':location, 'summary': summary})
            print('result= ' + str(scrape_result))
            scrape_results.append(scrape_result)
        return scrape_results
    else:
        print('Page timed out:' + url)
        return False
    
    # def dataToDB():
    #     # Clear Collection
    #     jobsColl.remove({})
    #     jobsColl.insert(scrape_result)

    # def dataFromDB():