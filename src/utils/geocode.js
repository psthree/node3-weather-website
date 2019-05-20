const request = require('request');

const geocode = (address, callback) => {
  const mapBoxToken =
    'pk.eyJ1IjoicHN0aHJlZSIsImEiOiJjanVsZHIxOHcyNXA2NDRwamhtOWZveXc1In0.rRCB6oto1d-617XTMNCY_w';
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapBoxToken}`;
  // console.log(geocodeUrl);
  request({ url: geocodeUrl, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Could not find that location', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
