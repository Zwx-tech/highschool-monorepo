// imports
const express = require("express");
const path = require("path")
// express set up
const app = express();
const PORT = 3000;

// route query
app.get("/", (req, res) => {
    console.log(req);
    res.send( `<h1>${value} radianów to ${resValue} stopni</h1>`);
})

// set up static files
app.use(express.static("static"));

// listen
app.listen(PORT, () => {
    console.log("start serwera na porcie " + PORT);
})