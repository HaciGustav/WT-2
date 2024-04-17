const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const movieModel = require("./movie-model.js");

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, "files")));

// Configure a 'get' endpoint for all movies..
app.get("/movies", function (req, res) {
  const movies = Object.values(movieModel);
  res.send(movies);
});

// Configure a 'get' endpoint for a specific movie
app.get("/movies/:imdbID", function (req, res) {
  const { imdbID } = req.params;
  const exists = imdbID in movieModel;
  if (!exists) res.sendStatus(404);
  res.send(movieModel[imdbID]);
});

app.put("/movies/:imdbID", function (req, res) {
  const { imdbID: id } = req.params;
  const movie = movieModel[id];

  movieModel[id] = req.body;

  if (!movie) {
    res.status(201);
    res.send(req.body);
  } else {
    res.status(200);
    res.send(req.body);
  }
});

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");
