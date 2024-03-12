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
    res.sendFile(path.join(__dirname, "/static/html/formularz-post.html"));
});

app.post("/handleForm", (req, res) => {
   res.send(req.body)
});



app.listen(PORT, () => {
    console.log("serwer started");
})