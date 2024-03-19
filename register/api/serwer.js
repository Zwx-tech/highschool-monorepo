const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

//* handle post
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* db mocku up
let activeUsers = [];
let currentlyHighestId = 0;

// helper
function isActiveUser(user) {
  return activeUsers.some(({ firstName }) => firstName === user.firstName);
}

function removeUserById(id) {
  activeUsers = activeUsers.filter((user) => user.id !== id);
}

function getCurrentTime() {
  return new Date().toLocaleString().replaceAll(".", "-").replaceAll(",", "");
}
app.get("/register", (req, res) => {
  const user = req.query;
  if (!isActiveUser(user)) {
    activeUsers.push({
      ...user,
      id: ++currentlyHighestId,
      creationTime: getCurrentTime(),
    });
    console.log(`ADDED NEW USER ${user.firstName} ${user.pass}`);
    res.json({ succes: true });
    return;
  }
  res.json({ succes: false, message: "User alreay exists" });
});

app.get("/delete-user", (req, res) => {
  const { id } = req.query;
  console.log(id);
  removeUserById(parseInt(id));
  res.json({ succes: true });
});

app.get("/", (req, res) => {
  res.json(activeUsers);
});

app.listen(process.env.EXPO_PUBLIC_API_PORT, () => {
  console.log(`app started at ${process.env.EXPO_PUBLIC_API_PORT}`);
});
