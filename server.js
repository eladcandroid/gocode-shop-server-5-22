import * as fsp from "fs/promises"
import * as fs from "fs"
import http from "http"
// const http = require('http');


function readMyFile(fileName) {
    fsp.readFile(`./${fileName}`, "utf8")
        .then((data) => {
            const tBuffer = fs.readFileSync('./translates.json', "utf8");
            const word = data;
            const tJson = JSON.parse(tBuffer);
            fsp.writeFile("./translates.json", JSON.stringify(tJson))
            const res = tJson.find(wordRes => wordRes.en === word);
            fsp.writeFile(`./myTextHe.txt`, res.he)
            console.log(res.he);
        })
        .catch((err) => console.log(err))
}





// Create HTTP server and listen on port 8000 for requests

http.createServer((request, response) => {
    console.log("test");

    readMyFile("myTextEn.txt")
    // Set the response HTTP header with HTTP status and Content type
    // response.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body "Hello World"
    response.end("Success");
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');