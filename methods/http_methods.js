const url = require("url");
const movies = require("./movie_methods");
const reqBodyParser = require("../util/body_parser");

function getReq(req, res) {
  const reqUrl = url.parse(req.url);
  const splitUrl = reqUrl.path.split("/");
  const index = splitUrl.at(splitUrl.length - 1);
  const moviesjson = movies.readMoviesJson();
  console.log(reqUrl.path);
  console.log(index);
  if (reqUrl.path === "/api/movies/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(moviesjson));
    res.end();
  } else if (reqUrl.path === `/api/movies/${index}`) {
    if (index <= moviesjson.length) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify(moviesjson.filter((movie) => movie.id == index)[0])
      );
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          title: "Not found",
          message: "movie not found",
        })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        title: "Not found",
        message: "route not found",
      })
    );
    res.end();
  }
}

async function postReq(req, res) {
  const reqUrl = url.parse(req.url);
  if (reqUrl.path === "/api/movies/") {
    console.log(req.method);
    try {
      const reqBody = await reqBodyParser.bodyParser(req);
      console.log(reqBody);
      movies.addToMovies(reqBody);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "success",
        })
      );
      res.end();
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "incorrect parameters",
        })
      );
      res.end();
    }
  }
}

async function putReq(req, res) {
  const reqUrl = url.parse(req.url);
  const splitUrl = reqUrl.path.split("/");
  const index = splitUrl.at(splitUrl.length - 1);
  if (reqUrl.path === `/api/movies/${index}`) {
    console.log(req.method);
    try {
      const reqBody = await reqBodyParser.bodyParser(req);
      movies.updateMovie(index, reqBody);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "success",
        })
      );
      res.end();
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "incorrect parameters",
        })
      );
      res.end();
    }
  }
}

function deleteReq(req, res) {
  const reqUrl = url.parse(req.url);
  const splitUrl = reqUrl.path.split("/");
  const index = splitUrl.at(splitUrl.length - 1);
  if (reqUrl.path === `/api/movies/${index}`) {
    console.log(req.method);
    try {
      movies.deleteMovie(index);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "success",
        })
      );
      res.end();
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "movie not found",
        })
      );
      res.end();
    }
  }
}

module.exports = { getReq, postReq, putReq, deleteReq };
