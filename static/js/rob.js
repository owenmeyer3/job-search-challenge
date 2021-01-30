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
  choropleth: new L.LayerGroup(),
};

// Create the map with data layers
var myMap = L.map("rob", {
  center: [38, -95],
  zoom: 5,
  layers: [ lightMap, layers.icons]
});

var overlays = {
  'Choropleth': layers.choropleth,
  'Icons': layers.icons
};

L.control.layers(mapStyle, overlays, {
  collapsed: false
}).addTo(myMap);

// Loop through data
for (var i = 0; i < data.length; i++) {  
  
  // Create a new marker at the appropriate coordinates and bind a popup to it then add the marker to the icons layer
  var newMarker = L.marker([data[i].lat, data[i].lng])
    .bindPopup("Job Title: " + data[i].title + "<br> Company: " + data[i].company + "<br> Date Posted: "+ new Date(data[i].createdAt) + "<br> Category: "+ data[i].category + "<br> Link: "+ data[i].redirect_url + "<br> Description: "+ data[i].description)
    .addTo(layers.icons);
}; 

// Load in geojson data
var geoData = "/static/geojsonData/us-county-boundaries-IL.geojson";

var geojson;

// Grab data with d3
d3.json(geoData, function(data) {

  // Create a new choropleth layer
  //geojson = L.choropleth(data, {
  geojson = L.geoJson(data, {  

    // Define what  property in the features to use
    valueProperty: "geoid",
    
    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("County: " + feature.properties.namelsad + ", " + feature.properties.stusab + "<br> Number of Jobs: " + feature.properties.geoid);
    }
  }).addTo(layers.choropleth);
  
  /*/ Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Jobs Available</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(layers.choropleth);
  */
});