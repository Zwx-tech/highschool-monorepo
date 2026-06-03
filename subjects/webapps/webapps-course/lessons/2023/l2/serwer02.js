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
    res.send(`<body style="margin: 0; padding: 0;"><div style="width: 100vw; height: 100vh; background-color: ${req.query.color}; display: grid; place-items: center; color: #fff; font-size: 2rem; font-family: monospace;">${req.query.color}</div></body>`)
});



app.listen(PORT, () => {
    console.log("serwer started");
})