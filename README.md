# Job Search

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
xxx

#### Company Bar Chart
xxx

#### Carl's Visual
xxx