const path = require("path");
const fs = require("fs");
const os = require("os");

/**
 * This method is used to insert at string into another string at a given index.
 * @param {String} original The original string
 * @param {Integer} index The index of where to insert the string
 * @param {String} string The string to insert
 * @returns A string with the given string inserted at index
 */
function insert(original, index, string) {
  if (index > 0) {
    return original.substring(0, index) + string + original.substr(index);
  }

  return string + original;
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* await walk(entry);
    else if (d.isFile()) yield entry;
  }
}

module.exports = insertNavbar = (req, res, next) => {
  if (req.method === "GET") {
    (async () => {
      let afterPagePath = req.baseUrl.split("/").pop();
      let matchFound = false;
      for await (const p of walk(
        path.join(__dirname, "..", "..", "..", "app", "views", "pages")
      )) {
        let currentFile;
        if (os.platform() === "win32") {
          currentFile = p.split("\\").pop().split(".").shift();
        } else {
          currentFile = p.split("/").pop().split(".").shift();
        }
        if (currentFile === afterPagePath) {
          matchFound = true;
          break;
        }
      }
      if (matchFound === false) {
        const err = new Error("File does not exists under the views directory");
        err.status = 404;
        next(err);
      } else {
        let file = path.join(
          __dirname,
          "../../../app",
          "views",
          "pages",
          `${afterPagePath}.pug`
        );
        let pugFile = fs.readFileSync(file, "utf-8");
        if (pugFile.indexOf("include ./Navbar/navbar") === -1) {
          pugFile = insert(
            pugFile,
            pugFile.indexOf("body") + "body".length + 9,
            "include ./Navbar/navbar\n        "
          );
          fs.writeFileSync(file, pugFile, "utf-8");
        }
        next();
      }
    })();
  }
};
