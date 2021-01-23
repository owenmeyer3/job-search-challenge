# Indeed Scrape
import csv
import requests
from bs4 import BeautifulSoup
# Setup URL template
def get_url(title, location):
    template = 'https://www.indeed.com/jobs?q={}&l={}'
    url = template.format(title, location)
    return url
# Extract record
def get_record(job):
    jobTitle=job.h2.a.get('title')
    jobCo=job.find('span', {'class':'company'}).text.strip()   
    jobLoc=job.find('div','recJobLoc').get('data-rc-loc')
    try:
        jobSal=job.find('span','salaryText').text.strip()
    except AttributeError:
        jobSal=''
    record=(jobTitle,jobCo,jobLoc,jobSal)
    print(record)
    return record
def main(title,location):
    records=[]
    url = get_url(title,location)
    # Extract jobs
    while True:
        response=requests.get(url)
        soup=BeautifulSoup(response.text,'html.parser')
        jobs=soup.find_all('div','jobsearch-SerpJobCard')
        for job in jobs:
            record=get_record(job)
            records.append(record)
        try:
            url='https://www.indeed.com' + soup.find('a',{'aria-label':'Next'}).get('href')
        except AttributeError:
            break
    # Output to csv
    with open('.\output\IndeedResults.csv','w',newline='',encoding='utf-8') as output:
       writer=csv.writer(output)
       writer.writerow(['Job_Title','Job_Company','Job_Location','Job_Salary'])
       writer.writerows(records)
main('Data Science','United States')