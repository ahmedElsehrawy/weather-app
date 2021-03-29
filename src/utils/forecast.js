const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=08225408f61371928c98c5c522774413&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.error) {
      callback(
        "unable to find location, make sure you use the right cordinates",
        undefined
      );
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        observation_time: response.body.current.observation_time,
      });
    }
  });
};

module.exports = forecast;
