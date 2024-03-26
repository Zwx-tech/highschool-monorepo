//* require
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const formidable = require("formidable");

//* express set up
const app = express();
const PORT = 3000;

//* handle post
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* handlebars set up
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main.hbs",
    extname: ".hbs",
    partialsDir: "views/partials",
    helpers: {},
  })
);
app.set("view engine", "hbs");

//* DB MOCK UP
/* //? INTERFACE MOCK UP
interface File {
    id: number,
    name: string,
    path: string,
    sizse: number,
    type: string,
    savedate: number
}
*/
const fileArr = [];
let maxID = 0;

//* helpers
function handleFileUpload(file) {
  console.log(123);
  fileArr.push({
    id: ++maxID,
    name: file.name,
    type: file.type,
    path: file.path,
    size: file.size,
    saveDate: Date.now(),
  });
}

//? GET
app.get("/", (req, res) => {
  console.log(fileArr);
  res.render("filemanager.hbs");
});

app.get("/upload", (req, res) => {
  res.render("upload.hbs");
});

//? POST
app.post("/upload", (req, res) => {
  //* handle file upload
  const form = formidable({});
  //* form config
  form.uploadDir = __dirname + "/static/upload/";
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, function (Ierr, fields, files) {
    if (Array.isArray(files)) {
      for (const file of files) {
        handleFileUpload(file);
      }
      res.redirect("/");
      return; //* not sure if i should include this, but better safe then sorry
    }
    handleFileUpload(files);
  });
  res.redirect("/");
});

app.get("/info", (req, res) => {
  res.render("info.hbs");
});

//* static
//? remeber use static right before the listen func
app.use(express.static(path.join(__dirname, "static")));

//* SERVE
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
