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
    res.sendFile(path.join(__dirname, "/static/html/color-range.html"));
});

app.post("/handleFetch", (req, res) => {
    // add json header
    res.header("content-type","application/json");
    const { red, green, blue, alpha } = req.body;
    const parsedAlpha = parseInt(alpha);

    res.send({color: `rgba(${red}, ${green}, ${blue}, ${parsedAlpha / 255})`});
});



app.listen(PORT, () => {
    console.log("serwer started");
})