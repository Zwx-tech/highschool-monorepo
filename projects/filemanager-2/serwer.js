//* require
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
//* get JSON file
const supportedFileExtensions = require("./data/supportedFileExtensions.json");

console.log(supportedFileExtensions);

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
  const extension = file.name.split(".").pop();
  const isExtensionSupported = supportedFileExtensions.includes(extension);

  fileArr.push({
    id: ++maxID,
    name: file.name,
    type: file.type,
    path: file.path,
    size: file.size,
    saveDate: Date.now(),
    icon: isExtensionSupported
      ? `bi-filetype-${extension}`
      : "bi-file-earmark-excel",
  });
}

//? GET
app.get("/filemanager", (req, res) => {
  console.log(fileArr);
  res.render("filemanager.hbs", { files: fileArr });
});

app.get("/", (req, res) => {
  res.render("upload.hbs");
});

app.get("/reset", (req, res) => {
  fileArr.splice(0, fileArr.length);
  res.redirect("/filemanager");
});

//? POST
app.post("/", (req, res) => {
  //* handle file upload
  const form = formidable({});
  //* form config
  form.uploadDir = path.join(__dirname, "static", "upload");
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, function (Ierr, fields, inputs) {
    const files = inputs.uploadedFiles; //* extract data from input
    if (Array.isArray(files)) {
      for (const file of files) {
        handleFileUpload(file);
      }
      return; //* not sure if i should include this, but better safe then sorry
    }
    handleFileUpload(files);
  });
  res.redirect("/filemanager");
});

app.get("/info", (req, res) => {
  console.log("/INFO");
  const { id } = req.query;
  if (!id) {
    res.render("info.hbs");
    return;
  }
  const file = fileArr.find((f) => f.id == id);
  if (!file) {
    res.status(400).json({ message: "Invalid file id!" });
    return;
  }
  res.render("info.hbs", { file });
});

app.get("/info/info", (req, res) => {
  res.redirect("/info ");
});

app.get("/dowland/", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "U have to provide file id!" });
    return;
  }
  const file = fileArr.find((f) => f.id == id);
  if (!file) {
    res.status(400).json({ message: "Invalid file id!" });
    return;
  }
  const fileName = file.path.split("\\").pop();
  const pathToFile = `${__dirname}/static/upload/${fileName}`;
  res.download(pathToFile);
});

app.get("/show/", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "U have to provide file id!" });
    return;
  }
  const file = fileArr.find((f) => f.id == id);
  if (!file) {
    res.status(400).json({ message: "Invalid file id!" });
    return;
  }
  const fileName = file.path.split("\\").pop();
  const pathToFile = `${__dirname}/static/upload/${fileName}`;
  res.sendFile(pathToFile);
});

app.get("/delete/", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "U have to provide file id!" });
    return;
  }
  const file = fileArr.find((f) => f.id == id);
  const fileIndex = fileArr.indexOf(file);
  if (!file) {
    res.status(400).json({ message: "Invalid file id!" });
    return;
  }

  fileArr.splice(fileIndex, 1);
  res.redirect("/filemanager");
});

//* static
//? remeber use static right before the listen func
app.use(express.static(path.join(__dirname, "static")));

//* SERVE
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
