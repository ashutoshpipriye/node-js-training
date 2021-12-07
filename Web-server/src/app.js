const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ashutosh Pipriye",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ashutosh Pipriye",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "This is some helpful text.",
    title: "About Me",
    name: "Ashutosh Pipriye",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowind",
    location: "Philadelphia",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ashutosh Pipriye",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ashutosh Pipriye",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
