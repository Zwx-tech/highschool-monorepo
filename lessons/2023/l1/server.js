// imports
const express = require("express");
const path = require("path");
// express set up
const app = express();
const PORT = 3000;

// for valid post
app.use(
  express.urlencoded({
    extended: true,
  })
);

// get req
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/pages/test.html"));
});

// route query
app.get("/test", (req, res) => {
  console.log(req.query);
  res.send("<h1>q</h1>");
});

app.post("/psy", (req, res) => {
  res.header("content-type", "application/json");

  const data = req.body;
  console.log(data);
  res.json({
    message: "psy",
  });
});

// set up static files
app.use(express.static("static"));

// listen
app.listen(PORT, () => {
  console.log("start serwera na porcie " + PORT);
});
