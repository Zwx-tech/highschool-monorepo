// imports
const express = require("express");
const path = require("path")

// app setup
const app = express("");
const PORT = 3000;

// for valid post
app.use(express.urlencoded({
    extended: true
}));

// add static files
app.use(express.static('static'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/html/formularz.html"));
});

app.get("/handleForm", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});



app.listen(PORT, () => {
    console.log("serwer started");
})