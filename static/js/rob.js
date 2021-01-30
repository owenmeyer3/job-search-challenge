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
  icons: new L.LayerGroup(),
  chloropleth: new L.LayerGroup(),
};

// Create the map with data layers
var myMap = L.map("rob", {
  center: [38, -95],
  zoom: 5,
  layers: [ lightMap, layers.icons]
});

var overlays = {
  'Chloropleth': layers.chloropleth,
  'Icons': layers.icons
};

L.control.layers(mapStyle, overlays, {
  collapsed: false
}).addTo(myMap);

// Loop through data
for (var i = 0; i < data.length; i++) {  
  
  // Create a new marker at the appropriate coordinates and bind a popup to it then add the marker to the icons layer
  var newMarker = L.marker([data[i].lat, data[i].lng])
    .bindPopup("Job Title: " + data[i].title + "<br> Company: " + data[i].company + "<br> Date Posted: "+ new Date(data[i].createdAt) + "<br> Category: "+ data[i].category)
    .addTo(layers.icons);
}; 