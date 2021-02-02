// To run, type 'flask run' in the terminal. Ctrl + click on url to open page
var data = JSON.parse(d3.select('#dataScript').attr('indata'));
console.log(data);

// Select the tile layer that will be the background of our map
var satelliteMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 20,
  id: 'mapbox/satellite-v9',
  accessToken: API_KEY
});

var streetsMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 20,
  id: 'mapbox/streets-v11',
  accessToken: API_KEY
});

var outdoorsMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 20,
    id: 'mapbox/outdoors-v11',
    accessToken: API_KEY
});

var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 20,
    id: 'mapbox/light-v10',
    accessToken: API_KEY
});

var darkMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 20,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
});

var mapStyle = {
  'Dark': darkMap,
  'Light': lightMap,
  'Outdoors': outdoorsMap,  
  'Satellite': satelliteMap,
  'Streets': streetsMap
};

// Initialize the LayerGroups
var layers = {
  markers: new L.LayerGroup(),
  choropleth: new L.LayerGroup(),
};

// Create the map with data layers
var myMap = L.map("rob", {
  //center: [41.87, -87.67], // Chicago
  //zoom: 10, // Chicago
  //center: [38, -95], //USA 
  //zoom: 5, //USA style.css 550h x 1000w
  center: [39.8, -88.75], // Illinois 
  zoom: 7, //Illinois style.css 800h x 500w,
  layers: [ streetsMap, layers.choropleth ]
});

var overlays = {
  'Choropleth': layers.choropleth,
  'Markers': layers.markers
};

L.control.layers(mapStyle, overlays, {
  collapsed: false
}).addTo(myMap);

var counties = [];

// Loop through data
for (var i = 0; i < data.length; i++) {  
  
  // Create a new marker at the appropriate coordinates and bind a popup to it then add the marker to the icons layer
  var newMarker = L.marker([data[i].lat, data[i].lng])
      .bindPopup("Job Title: " + data[i].title + "<br> Company: " + data[i].company + "<br> Location: " + data[i].locationAreaArr[3] + ", " + data[i].locationAreaArr[1] + "<br> Date Posted: " + new Date(data[i].createdAt) + "<br> Category: "+ data[i].category + "<br> <a href=" + data[i].redirect_url + ' target="_blank" rel="noopener noreferrer">Link</a> <br> Description: '+ data[i].description)
      .addTo(layers.markers);

  counties.push(data[i].locationAreaArr[2] + ", " + data[i].locationAreaArr[1]);
};

//Determine the number of jobs available in each County
var uniqueCounties = [...new Set(counties)];
var countyCounts = [];

uniqueCounties.forEach(uniqueCounty=>{
  var count = 0
  counties.forEach(county => {
    if (uniqueCounty == county){
        count+=1
    }
  });
  countyCounts.push({'county':uniqueCounty, 'count':count});
});

// Import the geojson county boundaries data using D3 and add it to the choropleth layer
d3.json("static/geojsonData/us-county-boundaries-IL.json", function(geoData) {
  console.log(geoData.features[1]);

  // Loop through data to get the unique county name and state
  geoData.features.forEach(uniqueCounty=>{
    let geoName = (uniqueCounty.properties.namelsad + ", " + uniqueCounty.properties.state_name);
    
    var jobCount = {"jobCount" : 0} //Sets default job count to 0

    // Find the job count for the current county name
    countyCounts.forEach(county => {
      if (county.county == geoName){
          jobCount = {"jobCount" : county.count}
      }  
    });
    // Assign the number of jobs in the county to the geoData properties as jobCount
    Object.assign(uniqueCounty.properties, jobCount);
  });

  //Build the choropleth layer 
  geojson = L.geoJson(geoData,{style: styleChoropleth,
  onEachFeature: onEachFeature
  }).addTo(layers.choropleth)
});

function getColor(d) {  // sets the choropleth color for each county based on the number of jobs available
  return d > 1000 ? '#005a32' :
         d > 500  ? '#238443' :
         d > 200  ? '#41ab5d' :
         d > 100  ? '#78c679' :
         d > 10   ? '#addd8e' :
         d > 5    ? '#d9f0a3' :
         d > 0    ? '#f7fcb9' :
                    '#ffffe5';
}

function getOpacity(d) {  // sets the choropleth fill opacity to .7 if data and 0 if no data
  return d > 0    ? 0.7 :
                    0; 
}

function styleChoropleth(feature) {  //styles the choropleth based on the number of jobs in each county
  return {
    fillColor: getColor(feature.properties.jobCount),
    weight: 2,
    opacity: 1,
    color: 'grey',
    fillOpacity: getOpacity(feature.properties.jobCount)  //0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 3,
    color: '#8F5DB0',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

var info = L.control({position: 'bottomleft'});

info.onAdd = function (myMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h5>Job Availability</h5>' +  (props ?
        '<b>' + props.namelsad + '</b><br />' + props.jobCount + ' Jobs Available'
        : 'Hover Over a County');
};

info.addTo(myMap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 5, 10, 100, 200, 500, 1000],
        labels = [];

    // loop to generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(myMap);