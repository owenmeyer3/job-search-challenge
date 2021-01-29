import datetime
import csv
from bs4 import BeautifulSoup
import requests
import dateutil.parser as dateparser
file='\Chicago-DS_AdzunaResults.csv'
header=['source','company','title','category','location','latitude','longitude','datePosted','link','description']
with open('.\output' + file, 'w', newline='') as handle:
        writer=csv.writer(handle, delimiter=',')
        writer.writerow(header)
# app_id='86767575'
# app_key='adc9c2040851b81df96181b91cfc65a1'
app_id = '2ae8e9f7'
app_key = '672a581c8ecccf03d3905935ded22d61'
country='us'
what='data science'
where='chicago'
max_days_old='30'
url = 'https://api.adzuna.com/v1/api/jobs/{}/search/{}?app_id={}&app_key={}&what={}&where={}&max_days_old={}'
response=requests.get(url.format(country,1,app_id, app_key,what,where,max_days_old))
results=response.json()
print(results)
jobCount = results.get('count')
print(jobCount)
with open('.\output' + file,'a',newline='') as handle:
    writer = csv.writer(handle, delimiter=',')
    for page in range(1,jobCount+1):
        response = requests.get(url.format(country,page,app_id, app_key, what, where,max_days_old))
        results= response.json()
        for result in results['results']:
            if result.get('title'):
                title = BeautifulSoup(result['title']).get_text()
            if result.get('description'):
                description = BeautifulSoup(result['description']).get_text()
            row_values = ['Adzuna',result['company'].get('display_name'),
                                    title,
                                    result['category']['label'],
                                    result['location'].get('display_name'),
                                    result['latitude'],
                                    result['longitude'],
                                    dateparser.parse(result['created']),
                                    result['redirect_url'],
                                    description]                            
            try:
                writer.writerow(row_values)
            except UnicodeEncodeError:
                row = [item.encode('utf-8') if item and not isinstance(item, datetime.datetime) else item for item in row_values]
                writer.writerow(row)