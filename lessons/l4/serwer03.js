// imports
const express = require("express");
const path = require("path")
const formidable = require('formidable');

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
    res.sendFile(path.join(__dirname, "/static/html/form3.html"));
});

app.post("/handleUpload", (req, res) => {
    res.header("content-type","application/json");
    const form = formidable({});
    
    // form config
    form.uploadDir = __dirname + '/static/upload/';
    form.keepExtensions = true;

    const tab = [];
    let startingTime = new Date().getTime();
    let endDate;
    form.on("progress", function (bytesReceived, bytesExpected) {
        const dT = new Date();
        console.log(dT.getTime());
        tab.push({
            bytesReceived,
            bytesExpected,
            currentTime: `${dT.getSeconds()}s ${dT.getMilliseconds()} ms`
        });
    });
    
    form.on("fileBegin", function (name, value) {

    });
    
    form.on("end", function () {
        endDate = new Date().getTime();
    });

    form.parse(req, function (err, fields, files) {
        res.send(JSON.stringify({
            tab: tab,
            fullTime: `${endDate - startingTime}ms`
        }, null, 5));
    });
})




app.listen(PORT, () => {
    console.log("serwer started");
})