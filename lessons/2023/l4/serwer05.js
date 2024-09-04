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
    res.sendFile(path.join(__dirname, "/static/html/form4.html"));
});

app.post("/handleUpload", (req, res) => {
    res.header("content-type","application/json");
    const form = formidable({});
    
    // config
    form.uploadDir = __dirname + '/static/upload/';
    form.keepExtensions = true;

    // handle upload
    form.parse(req, function (err, fields, files) {
 
        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);
        const file = files.imagetoupload;

        res.send(JSON.stringify([fields, {
            imageupload: {
                size: file.size,
                path: file.path,
                name: file.name,
                type: file.type,
                mtime: file.lastModifiedDate,
            } 
        }], null, 5));
    });
})




app.listen(PORT, () => {
    console.log("serwer started");
})