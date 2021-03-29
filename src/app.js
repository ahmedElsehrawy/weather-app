const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handleBars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Elsehrawy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
  });
});

app.get("/help", (req, res) => {
  res.render("about", {
    title: "Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "there is no help here",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address term",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return console.log(error);
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(data.location);
      console.log(forecastData);
      res.send({
        location: data.location,
        temperature: forecastData.temperature,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "My 404 page",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
