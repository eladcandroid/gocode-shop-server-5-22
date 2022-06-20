import * as fsp from "fs/promises";
// import * as fs from "fs"
import http from "http";
// const http = require('http');

function readMyFile(fileName) {
  fsp
    .readFile(`./${fileName}`, "utf8")
    .then((word) => {
      fsp.readFile("./translates.json", "utf8").then((data) => {
        const tJson = JSON.parse(data);
        const translation = tJson.find((wordRes) => wordRes.en === word);
        fsp.writeFile(`./myTextHe.txt`, translation.he);
      });
    })
    .catch((err) => console.log(err));
}

// Create HTTP server and listen on port 8000 for requests

http
  .createServer((request, response) => {
    readMyFile("myTextEn.txt");
    response.end("Success");
  })
  .listen(8000);

// Print URL for accessing server
console.log("Server running at http://127.0.0.1:8000/");
