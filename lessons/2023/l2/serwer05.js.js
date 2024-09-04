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

const cars = [
    "audi",
    "opel",
    "francuz",
    "duży fiat",
    "mercedes",
    "małe fajne autko",
    'test'
]
// add static files
app.use(express.static('static'));

// helper func
function generateCarInput(id, carName) {
    return `<tr>
    <td><label for="${carName}">${id} -> ${carName}</label></td>
    <td><input type="radio" name="${carName}" value="new"></td>
    <td><input type="radio" name="${carName}" value="used"></td>
    <td><input type="radio" name="${carName}" value="damaged"></td>
    </tr>`
}

// routes
app.get("/", (req, res) => {
    let tableBody = '';
    cars.forEach((el, i) => {
        tableBody += generateCarInput(i, el);
    });
    res.send(`<form action="/handleForm" method="POST"><table><tr><th></th><th>Nowe</th><th>Używane</th><th>Powypadkowe</th></tr>${tableBody}</table><button type="submit">Submit</button></form>`)
});

app.post("/handleForm", (req, res) => {
   const response = {
    new: 0,
    used: 0,
    damaged: 0
   };
   for(const carName in req.body) {
    const state = req.body[carName];
    if(state == "new") {
        response.new++;
    }
    else if(state == "used") {
        response.used++;
    } else {
        response.damaged++;
    }
   }
   res.send(response);
});



app.listen(PORT, () => {
    console.log("serwer started");
})