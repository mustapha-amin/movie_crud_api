const http = require("http");
const url = require("url")
require("dotenv").config();
const httpMethods = require("./methods/http_methods");
const PORT = process.env.PORT;

let movies = require("./data/movies.json");

const server = http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            console.log(req.url, req.method, res.statusCode)
            httpMethods.getReq(req, res)
            break;
        case "POST":
            httpMethods.postReq(req, res)
             break;
        case "PUT":
            httpMethods.putReq(req, res)
            break;
        case "DELETE":
            httpMethods.deleteReq(req, res)
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(
                {
                    "Not found": "Hello from a test api"
                }
            ))
            res.end();
    }
});

server.listen(PORT, ()=> {
    console.log("Server started on port : " + PORT)
})

