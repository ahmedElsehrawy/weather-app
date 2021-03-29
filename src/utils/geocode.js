const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?types=country&access_token=pk.eyJ1IjoiYWhtZWRlbHNlaHJhd3kiLCJhIjoiY2ttcnF5bG5qMGFrZTJvbzY1Nzl1cnU4NiJ9.LQOXClQ2W7tvPZ5oIUEduQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location try the correct one", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
