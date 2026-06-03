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

// for valid jsons
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/html/mouse.html"));
});

app.post("/handleFetch", (req, res) => {
    // add json header
    res.header("content-type","application/json");
    const { x, y } = req.body;


    res.send({});
});



app.listen(PORT, () => {
    console.log("serwer started");
})