// imports
const express = require("express");
const path = require("path")
// express set up
const app = express();
const PORT = 3000;

// route query
app.get("/", (req, res) => {
    const { count, bg } = req.query;
    let resBody = [...Array(parseInt(count))].map((_, i) => {
        return `<div class="block" style="background-color: ${bg};aspect-ratio: 1 / 1; width: 5rem; display: grid; place-items: center;">${i + 1}</div>`
    });

    res.send( `<div style="display: flex; flex-wrap: wrap; width: 100%; gap: .5rem;">${resBody.join("")}</div>`);
})

// set up static files
app.use(express.static("static"));

// listen
app.listen(PORT, () => {
    console.log("start serwera na porcie " + PORT);
})