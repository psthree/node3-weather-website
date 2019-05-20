const request = require('request');

//https://api.darksky.net/forecast/570dfb6f59de5ba39c823b8873c2d2ee/42.462,-83.1036?units=us

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `https://api.darksky.net/forecast/570dfb6f59de5ba39c823b8873c2d2ee/${latitude},${longitude}?units=us`;
  //console.log(forecastUrl);
  request({ url: forecastUrl, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Forecast services', undefined);
    } else if (body.error) {
      callback('Could not find the location', undefined);
    } else {
      callback(undefined, {
        location: body.timezone,
        summary: body.daily.data[0].summary,
        temp: body.currently.temperature,
        forecast: `${body.currently.summary} It is currently ${
          body.currently.temperature
        }°, there is a ${body.currently.precipProbability}% chance of rain`
      });
    }
  });
};

module.exports = forecast;
