# Job Search

<p>
    <img src="https://github.com/owenmeyer3/project-3/blob/main/output/Display%20Output.png"/>
    <br>
    <em>Display Output of Interactive Job Search Dashboard</em>
</p> 

## Overview
This project presents a Flask web page that displays jobs and visualizations based on a user search. The Flask application is used to pass data to and from a Mongo database. The job data comes from the Adzuna API.

## User Input (UI)
The user modifies the search by selecting the job type, location and maximum distance (in miles) away from the specified location. The parameters are passed to the Flask app via the form submission url query parameters.

## Flask App (python)
#### Getting user parameters
The Flask app recieves UI parameters from the UI form submission

#### Getting jobs
The Flask app uses search parameters and the Adzuna API to get job data. The app loops through each page of the job search (The Adzuna api requires a page number for each request. One page is equivalent to 10 jobs) and adds the jobs objects to an array. The job data is parsed to clean and minimize data.

#### Mongo
The app uses pyMongo to push job data to a Mongo database. The app then pulls data from this database to use on the web page.

#### Flask app to HTML Data Transfer
The Flask app passes the job data to the webpage with the render_template() function. The data is stored as an attribute in a script tag.

## Javascript
#### Job Table
The job table is constructed with the company and job type data from the Adzuna API.

#### Job Map
The map tool was created using leaflet and mapbox. The objective is to show where the jobs are located and in relaive quantiies. The application imports 5 set of map tiles from map box and allows the user to select which map style to display. The map employs two overlays:

1. The first layer is a choropleth that displays the job counts by county. The data is created by gathering all of the county and state names for each job posting and filtering them to gather all of the unique county names. This list is then compared to the complete set to count the number a job announcments in each county. Next the geojson data that contains the coordinate values for rendering the county shapes was imported from opendatasoft.com. The next challenge was to append the job counts data to the geojson data which was accomplished using a Object.assign command. The geojson data was bound to a geojson layer and formatted using leaflet. The overlay was given additional functionality to display job counts when the curser is hovered over the county and zooms in to the full county view when clicked. 

2. The second layer uses leaflet to create markers for each job posting based on latitude and longitude data in the job positing. The markers are given additional functionality to display a pop-up of job title company location and description. The pop-up also includes a link which opens the job application in a new window. 

#### Company Bar Chart
The Job Posting or Company Bar Chart was created using Plotly.  We wanted to answer, what are the companies that have the most job postings by job type, in the example in the ppt we looked at Data Science as a Job Type.  You can see that Microsoft Corporation and IBM have the most job postings for this Job Type.  Since I worked a IBM before, maybe it's because they have a high turnover rate or is it that they just have a need for that many new people because they are growing.  More questions to ponder. 

#### Interactive Top-N Chart
![Carl's Chart Pic](https://github.com/owenmeyer3/project-3/blob/main/output/CarlChart.png)
