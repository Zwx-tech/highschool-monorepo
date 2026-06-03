// imports
const express = require("express");
const path = require("path")
// express set up
const app = express();
const PORT = 3000;

// route query
app.get("/", (req, res) => {
    const { value, toRad } = req.query;
    let resValue = toRad == "true" ? value * (Math.PI / 180) : value * (180 / Math.PI);
    if (toRad == "true") {
        res.send( `<h1>${value} stopni to ${resValue} radianów</h1>`);
        return;
    }
    res.send( `<h1>${value} radianów to ${resValue} stopni</h1>`);
})

// set up static files
app.use(express.static("static"));

// listen
app.listen(PORT, () => {
    console.log("start serwera na porcie " + PORT);
})