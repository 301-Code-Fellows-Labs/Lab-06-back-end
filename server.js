'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());

let locations = [];
let weatherAtLocation = [];

app.get('/location', (request, response) => {
  try {
    const geoData = require('./data/geo.json');
    const location = new Location(request.query.data, geoData);
    locations.push(location);
    response.send(locations);
  } catch (error) {
    response.status(400).send({ '404 error': error });
  }
});


app.get('/weather', (request, response) => {
  try{
    const weatherData = require('./data/darksky.json');
    const weather = new Weather(request.query.data, weatherData);
    weatherAtLocation.push(weather);
    response.send(weather);
  } catch (error) {
    response.status(400).send({ '404 error': error });
  }
});


function Location(query, geoData) {
  this.search_query = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lat;
  this.name = geoData.results[0].formatted_address;
}
function Weather(query, weatherData) {
  this.search_query = query;
  this.latitude = weatherData.latitude;
  this.longitude = weatherData.longitude;
  this.forecast = weatherData.currently.summary;
  this.time = new Date(weatherData.currently.time).toString();
}

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
})
