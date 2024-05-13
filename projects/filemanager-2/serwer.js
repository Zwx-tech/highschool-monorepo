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
    helpers: {
      getFileIcon: function (file) {
        const extension = file.name.split(".").pop();
        const isExtensionSupported =
          supportedFileExtensions.includes(extension);
        return isExtensionSupported
          ? `bi-filetype-${extension}`
          : "bi-file-earmark-excel";
      },
      clipFileName: function (fileName) {
        if (fileName.length > 9) {
          return fileName.slice(0, 9) + "...";
        }
        return fileName;
      },
    },
  })
);
app.set("view engine", "hbs");

//* DB MOCK UP
/* //? INTERFACE MOCK UP
interface File {
    id: number,
    name: string,
    path: string,
    size: number,
    type: string,
    savedate: number
}
interface F {
  name: string,
  isDirectory: boolean,
  path: string,
  savedate: number
}
interface fileArr {
  files: F[],
}
*/
//* GLOBALS
const uploadDir = path.join(__dirname, "static", "upload");

// ? DateFormatting
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

//* helpers
function handleFileUpload(file) {
  const originalPath = path.join(uploadDir, file.name);
  if (fs.existsSync(originalPath)) {
    const fileNameWithoutExt = path.parse(originalPath).name;
    const fileExt = path.parse(originalPath).ext;

    let copyNumber = 1;
    let newPath;

    // * Loop until a unique filename is found
    do {
      newPath = path.join(
        uploadDir,
        `${fileNameWithoutExt} - Copy(${copyNumber})${fileExt}`
      );
      copyNumber++;
    } while (fs.existsSync(newPath));

    // * Move the file with the new unique filename
    fs.renameSync(file.path, newPath);
    return;
  }
  fs.renameSync(file.path, originalPath);
}

function readUploadDir() {
  return fs.readdirSync(uploadDir).map((file) => {
    const stats = fs.lstatSync(path.join(uploadDir, file));
    return {
      name: file,
      isDirectory: stats.isDirectory(),
      size: stats.size,
      saveDate: stats.birthtimeMs,
    };
  });
}

//? GET
app.get("/", async (req, res) => {
  const fileArr = await readUploadDir();
  console.log(fileArr);
  res.render("filemanager.hbs", { files: fileArr });
});

app.get("/reset", (req, res) => {
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
  res.redirect("/");
});

app.post("/add", (req, res) => {
  //* entity stands for FileSystemEntity - File System Object that can be both file and directory
  //* FileSystemEntityName was just little too long
  const { isDirectory, entityName } = req.body;

  let fileName = entityName;
  if (!fileName.endsWith(".txt") && !isDirectory) {
    fileName += ".txt";
  }

  const newEntityPath = path.join(uploadDir, fileName);

  //* First we check it theres FileSystemEntity like that
  if (fs.existsSync(newEntityPath)) {
    //* Future error handling and message display
    //? return res.status(500).json(error: "Folder already exists");
    return res.redirect("/");
  }

  //* DIRECTORY
  if (isDirectory) {
    fs.mkdirSync(newEntityPath);
    res.redirect("/");
    return;
  }

  //* FILE ADDITION
  //* Let's also add current timestamp to file, to keep track of its creation date
  fs.writeFileSync(
    newEntityPath,
    `Created on ${new Date().toLocaleDateString("pl-PL", dateOptions)}\n`,
    "utf8"
  );
  res.redirect("/");
});

app.get("/delete/:entityName", (req, res) => {
  const { entityName } = req.params;
  if (!entityName) {
    res.status(400).json({ message: "U have to provide correct entity name!" });
    return;
  }

  const entityPath = path.join(uploadDir, entityName);

  if (!fs.existsSync(entityPath)) {
    //* Future error handling and message display
    //? return res.status(500).json(error: "Folder already exists");
    return res.redirect("/");
  }

  //* HANDLE DIRECTORY DELETION
  if (fs.statSync(entityPath).isDirectory) {
    //* We use force to prevent any random errors
    fs.rmSync(entityPath, { recursive: true, force: true });
    res.redirect("/");
    return;
  }

  //* HANDLE FILE DELETION
  fs.unlinkSync(entityPath); // ! DELETE ENTITY
  res.redirect("/");
});

//* static
//? remember use static right before the listen func
app.use(express.static(path.join(__dirname, "static")));

//* SERVE
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
