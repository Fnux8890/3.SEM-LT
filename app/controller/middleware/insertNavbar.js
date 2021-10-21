import { join } from "path";
import { promises, readFileSync, writeFileSync } from "fs";
import { platform } from "os";

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
  for await (const d of await promises.opendir(dir)) {
    const entry = join(dir, d.name);
    if (d.isDirectory()) yield* await walk(entry);
    else if (d.isFile()) yield entry;
  }
}

export const insertNavbar = (req, res, next) => {
  if (req.method === "GET") {
    let afterPagePath = req.baseUrl.split("/").pop();
    let matchFound = false;
    (async () => {
      for await (const p of walk(
        join(__dirname, "..", "..", "..", "app", "views", "pages")
      )) {
        let currentFile;
        if (platform() === "win32") {
          currentFile = p.split("\\").pop().split(".").shift();
        } else {
          currentFile = p.split("/").pop().split(".").shift();
        }
        if (currentFile === afterPagePath) {
          matchFound = true;
          break;
        }
      }
    })()
      .then(() => {
        if (matchFound === false && afterPagePath !== "page") {
          console.log(`AfterPagePath: ${afterPagePath}`);
          const err = new Error(
            "File does not exists under the views directory"
          );
          err.status = 404;
          next(err);
        }
        if (matchFound === true && afterPagePath !== "page") {
          let file = join(
            __dirname,
            "../../../app",
            "views",
            "pages",
            `${afterPagePath}.pug`
          );
          let pugFile = readFileSync(file, "utf-8");
          if (pugFile.indexOf("include ./Navbar/navbar") === -1) {
            pugFile = insert(
              pugFile,
              pugFile.indexOf("body") + "body".length + 9,
              "include ./Navbar/navbar\n        "
            );
            writeFileSync(file, pugFile, "utf-8");
          }
          next();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};
