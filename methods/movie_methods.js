const fs = require("fs");
const path = require("path");
let movies = require("../data/movies.json");
function readMoviesJson() {
  return movies;
}

function addToMovies(json) {
  try {
   movies.push(json);
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "movies.json"),
      JSON.stringify(movies),
      "utf-8"
    );
  } catch (err) {
    console.log("An error occured:", err);
  }
}

function deleteMovie(id) {
    if(movies.find((element) => element.id == id) !== undefined) {
      movies = movies.filter((element) => element.id != id);
      try {
        fs.writeFileSync(
          path.join(__dirname, "..", "data", "movies.json"),
          JSON.stringify(movies),
          "utf-8"
        );
      } catch (error) {
        console.log("An error occured");
      }
    } else {
      throw Error("Not found")
    }
}

function updateMovie(index, movieJson) {
  console.log(index)
    try {
     const newMovies = movies.map((e) => {
      if(e.id == index) {
        return movieJson;
      } else {
        return e;
      }
     })
      fs.writeFileSync(
        path.join(__dirname, "..", "data", "movies.json"),
        JSON.stringify(newMovies),
        "utf-8"
      );
    } catch (error) {
      console.log("An error occured:", error);
    }
}

module.exports = { readMoviesJson, addToMovies, deleteMovie, updateMovie };
