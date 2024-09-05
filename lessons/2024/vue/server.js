const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.static("static"));

app.use(express.static("static/cwiczenia"));

app.get("/get-lessons", (req, res) => {
  const lessonsNames = fs.readdirSync(path.join(__dirname, "static", "cwiczenia"));
  const response = {};

  for (const lessonName of lessonsNames) {
    const exerciseNames = fs.readdirSync(path.join(__dirname, "static", "cwiczenia", lessonName));
    response[lessonName] = exerciseNames;
  }

  res.send(response);
});

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
