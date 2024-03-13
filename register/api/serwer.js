const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

//* handle post
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* db mocku up
const activeUsers = [];

app.post("/register", (req, res) => {
  const { firstName, secondName } = req.body;
  console.log(firstName, secondName);
  res.json({ succes: true });
});

app.listen(3000, () => {
  console.log("app started");
});
