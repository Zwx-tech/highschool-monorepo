// imports
const express = require("express");
const path = require("path")
// express set up
const app = express();
const PORT = 3000;

// get req
app.get("/test", (req, res) => {
    
    res.send("<h1>test</h1>");
})

// route query
app.get("/test", (req, res) => {
    console.log(req.query);
    res.send("<h1>q</h1>");
})

app.get("/psy", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/pages/psy.html"));
})
app.get("/koty", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/pages/kot.html"));
})
app.get("/drzewa", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/pages/drzewa.html"));
})

// set up static files
app.use(express.static("static"));

// listen
app.listen(PORT, () => {
    console.log("start serwera na porcie " + PORT);
})