//* require
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
//* get JSON file
const supportedFileExtensions = require("./data/supportedFileExtensions.json");
const defaultFileContent = require("./data/fileDefaultContent.json");

const defaultFileContentSupportList = Object.keys(defaultFileContent);

const filters = require("./data/filters.json");

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

app.use(express.json());

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
      getRouteElements: function (dir) {
        //* handle edge case (home route)
        if (!dir) return [];

        //* WE use path.sep, to handle both unix and windows paths
        const dirArr = dir.split("/");
        let currentPath = "";

        return dirArr.map((part, index) => {
          if (index === 0 && part === "") {
            currentPath = "/";
          } else {
            currentPath = path.join(currentPath, part);
          }
          return { name: part, path: currentPath };
        });
      },
      clipFileName: function (fileName) {
        if (fileName.length > 9) {
          return fileName.slice(0, 9) + "...";
        }
        return fileName;
      },
      getFileName: function (pathToFile) {
        return path.parse(pathToFile).name;
      },
      isExtensionSelected: function (pathToFile, extension) {
        return path.parse(pathToFile).ext.slice(1) === extension
          ? "selected"
          : "";
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
function handleFileUpload(file, currentDir) {
  const originalPath = path.join(uploadDir, currentDir, file.name);
  const finalPath = path.join(uploadDir, currentDir);
  if (fs.existsSync(originalPath)) {
    const fileNameWithoutExt = path.parse(originalPath).name;
    const fileExt = path.parse(originalPath).ext;

    let copyNumber = 1;
    let newPath;

    //* Loop until we find a unique filename
    //* I am full aware that using while loop can cause some problems
    //* BUT different solution would require thinking to much
    //* Sooo I'll just leave is as it is :)
    do {
      newPath = path.join(
        finalPath,
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

function readUploadDir(dir = "") {
  return fs.readdirSync(path.join(uploadDir, dir)).map((file) => {
    const stats = fs.lstatSync(path.join(uploadDir, dir, file));
    return {
      name: file,
      isDirectory: stats.isDirectory(),
      size: stats.size,
      saveDate: stats.birthtimeMs,
      relativePath: path.join(dir, file),
    };
  });
}

//? GET
app.get("/", (req, res) => {
  res.redirect("/filemanager/");
});

app.get("/filemanager/*", async (req, res) => {
  const dir = req.params[0] || "";
  console.log(fs.lstatSync(path.join(uploadDir, dir)).isDirectory());
  if (!fs.lstatSync(path.join(uploadDir, dir)).isDirectory()) {
    res.sendFile(path.join(uploadDir, dir));
    return;
  }
  const fileArr = readUploadDir(dir || "");
  res.render("filemanager.hbs", { files: fileArr, currentDir: dir });
});

app.get("/reset", (req, res) => {
  res.redirect("/filemanager/");
});

//? POST
app.post("/upload", (req, res) => {
  //* handle file upload
  const form = formidable({ keepExtensions: true, multiples: true });
  form.uploadDir = uploadDir;

  //* Redirect back to url req came from
  const referer = req.headers.referer || "/";

  form.parse(req, function (Ierr, fields, inputs) {
    const currentDir = fields.currentDir || ""; //* extract currentDir from fields
    form.uploadDir = path.join(__dirname, "static", "upload", currentDir);

    const files = inputs.uploadedFiles; //* extract data from input
    if (Array.isArray(files)) {
      for (const file of files) {
        handleFileUpload(file, currentDir);
      }
      res.redirect(referer);
      return; //* not sure if i should include this, but better safe then sorry
    }
    handleFileUpload(files, currentDir);
    res.redirect(referer);
  });
});

app.post("/add", (req, res) => {
  //* entity stands for FileSystemEntity - File System Object that can be both file and directory
  //* FileSystemEntityName was just little too long
  const { isDirectory, entityName, entityExtension, relativePath } = req.body;

  let fileName = entityName;
  if (!isDirectory) {
    fileName += `.${entityExtension}`;
  }

  //* Relative path is currently selected directory in file system
  //* this way we can add entity in correct place in out file system
  const newEntityPath = path.join(uploadDir, relativePath, fileName);

  //* First we check it theres FileSystemEntity like that
  if (fs.existsSync(newEntityPath)) {
    //* Future error handling and message display
    //? return res.status(500).json(error: "Folder already exists");
    return res.redirect(`/filemanager/${relativePath}`);
  }

  //* DIRECTORY
  if (isDirectory) {
    fs.mkdirSync(newEntityPath);
    res.redirect(`/filemanager/${path.join(relativePath, entityName)}`);
    return;
  }

  //* FILE ADDITION
  //* The content of file we are adding can differ depending on the file extension so we handle it here
  //* Also The default is txt file so i set the current date i default value
  let fileContent = `Created on ${new Date().toLocaleDateString(
    "pl-PL",
    dateOptions
  )}\n`;

  if (defaultFileContentSupportList.includes(entityExtension)) {
    fileContent = defaultFileContent[entityExtension];
  }

  fs.writeFileSync(newEntityPath, fileContent, "utf8");
  res.redirect(`/filemanager/${relativePath}`);
});

app.post("/renameFolder", (req, res) => {
  const { newFolderName, relativePath } = req.body;

  //* We probably don't want user to rename home folder
  if (relativePath == "") return res.redirect(`/?dir=${relativePath}`);

  const folderPath = path.join(uploadDir, relativePath);
  const newRelativePath = path.join(relativePath, "../", newFolderName); //* Amazing piece of code i found on stack
  const newPath = path.join(uploadDir, newRelativePath);

  //* First we check it theres FileSystemEntity like that
  if (!fs.existsSync(folderPath)) {
    //* Future error handling and message display
    //? return res.status(500).json(error: "Folder already exists");
    return res.redirect(`/filemanager/${relativePath}`);
  }

  fs.renameSync(folderPath, newPath);
  res.redirect(`/filemanager/${newRelativePath}`);
  return;
});

app.post("/renameFile", (req, res) => {
  const { newFileName, newFileExtension, relativePath } = req.body;

  const fileName = `${newFileName}.${newFileExtension}`;

  //* We probably don't want user to rename home folder
  if (relativePath == "") return res.redirect(`/?dir=${relativePath}`);

  const filePath = path.join(uploadDir, relativePath);
  const newRelativePath = path.join(relativePath, "../", fileName); //* Amazing piece of code i found on stack
  const newPath = path.join(uploadDir, newRelativePath);

  //* First we check it theres FileSystemEntity like that
  if (!fs.existsSync(filePath)) {
    //* Future error handling and message display
    //? return res.status(500).json(error: "Folder already exists");
    return res.redirect(`/filemanager/${relativePath}`);
  }

  fs.renameSync(filePath, newPath);
  res.redirect(`/showfile/${newRelativePath}`);
  return;
});

app.get("/delete/*", (req, res) => {
  //* Redirect back to url req came from
  const referer = req.headers.referer || "/";
  const entityName = req.params[0] || ""; //* FOUND THIS ONE IN EXPRESS DOCS AND IT IMPROVES READABILITY OF THE CODE BY a lot

  if (!entityName) {
    res.status(400).json({ message: "U have to provide correct entity name!" });
    return;
  }

  const entityPath = path.join(uploadDir, entityName);

  if (!fs.existsSync(entityPath)) {
    //* Future error handling and message display
    //* THIS approach only make sens when we use fetch api, tho we use special url param for that
    //? return res.status(500).json(error: "Folder already exists");
    return res.redirect(referer);
  }

  //* HANDLE DIRECTORY DELETION
  if (fs.statSync(entityPath).isDirectory) {
    //* We use force to prevent any random errors
    fs.rmSync(entityPath, { recursive: true, force: true });
    res.redirect(referer);
    return;
  }

  //* HANDLE FILE DELETION
  fs.unlinkSync(entityPath); // ! DELETE ENTITY
  res.redirect(referer);
});

//* SHOW FILE
app.get("/showfile/*", (req, res) => {
  const filePath = req.params[0] || "";
  const fileExtension = path.parse(filePath).ext.slice(1);

  const referer = req.headers.referer || "/";

  //* HANDLE IMAGES
  if (["jpg", "png"].includes(fileExtension)) {
    return res.render("showImage.hbs", { currentDir: filePath, filters });
  }

  //* HANDLE TEXT FILES
  if (["txt", "js", "css", "html", "json"].includes(fileExtension)) {
    const fileContent = fs.readFileSync(path.join(uploadDir, filePath), {
      encoding: "utf8",
      flag: "r",
    });

    return res.render("showfile.hbs", { fileContent, currentDir: filePath });
  }

  //* DEFAULT GATEWAY
  return res.redirect(referer);
});

app.get("/preview/*", (req, res) => {
  const filePath = req.params[0] || "";

  res.sendFile(path.join(uploadDir, filePath));
});

app.post("/updatefile/*", (req, res) => {
  const filePath = req.params[0] || "";
  const referer = req.headers.referer || "/";
  const { fileContent } = req.body;

  fs.writeFileSync(path.join(uploadDir, filePath), fileContent, "utf-8");

  res.redirect(referer);
});

app.get("/get-theme", (req, res) => {
  const theme = fs.readFileSync(path.join(__dirname, "data", "theme.json"), {});
  try {
    const themeObj = JSON.parse(theme);
    res.json(themeObj);
  } catch (err) {
    res.status(500).json({ message: "Error while reading theme file" });
  }
});

app.get("/get-theme-list", (req, res) => {
  const themes = fs.readFileSync(
    path.join(__dirname, "data", "themes.json"),
    {}
  );
  try {
    const themesObj = JSON.parse(themes);
    res.json(themesObj);
  } catch (err) {
    res.status(500).json({ message: "Error while reading theme file" });
  }
});

app.get("/edit-color-themes", (req, res) => {
  const themes = fs.readFileSync(
    path.join(__dirname, "data", "themes.json"),
    {}
  );
  try {
    const themesObj = JSON.parse(themes);
    const themeNames = Object.keys(themesObj);
    const themesArr = themeNames.map((themeName) => {
      return {
        name: themeName,
        color: themesObj[themeName].color,
        background: themesObj[themeName].backgroundColor,
      };
    });
    res.render("editColorThemes.hbs", { themes: themesArr });
  } catch (err) {
    res.status(500).json({ message: "Error while reading theme file" });
  }
});

app.post("/update-color-themes", (req, res) => {
  const themes = req.body;
  if (!themes || themes == {})
    return res.status(400).json({ message: "No themes provided" });

  fs.writeFileSync(
    path.join(__dirname, "data", "themes.json"),
    JSON.stringify(themes),
    "utf-8"
  );
  res.status(200).json({ message: "Themes updated" });
});

app.post("/update-theme", (req, res) => {
  const theme = req.body;
  if (!theme) return res.status(400).json({ message: "No theme provided" });

  console.log(theme);

  fs.writeFileSync(
    path.join(__dirname, "data", "theme.json"),
    JSON.stringify(theme),
    "utf-8"
  );
  res.status(200).json({ message: "Theme updated" });
});

app.post("/save-image", (req, res) => {
  //* handle file upload
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    multiples: false,
  });
  form.uploadDir = uploadDir;

  //* Redirect back to url req came from
  const referer = req.headers.referer || "/";

  form.parse(req, function (Ierr, fields, inputs) {
    const currentDir = fields.currentDir || ""; //* extract currentDir from fields
    const imagePath = fields.path || "";

    form.uploadDir = path.join(
      __dirname,
      "static",
      "upload",
      currentDir,
      "../"
    );

    const image = inputs.image; //* extract data from input

    if (!image) {
      res.redirect(referer);
      return;
    }

    fs.renameSync(image.path, path.join(__dirname, "static", imagePath));
    res.redirect(referer);
  });
});

//* static
//? remember use static right before the listen func
app.use(express.static(path.join(__dirname, "static")));

//* SERVE
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
