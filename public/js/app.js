const address = document.getElementById("address");
const weatherForm = document.getElementById("weatherForm");
var locationWeather = document.getElementById("location");
const weather = document.getElementById("weather");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addressValue = address.value;
  locationWeather.textContent = "loading..";
  weather.textContent = "";
  if (addressValue) {
    fetch("http://localhost:3000/weather?address=" + addressValue + "").then(
      (response) => {
        response.json().then((data) => {
          locationWeather.textContent = data.location;
          weather.textContent = data.temperature;
        });
      }
    );
  } else {
    console.log("You must add a country");
  }
});
setTimeout(() => {
  if (locationWeather.textContent === "loading..") {
    locationWeather.textContent = "unable to find that place";
  }
}, 5000);
