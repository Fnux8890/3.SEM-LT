const path = require("path");
const fs = require("fs");
module.exports = insertNavbar = (req, res, next) => {
  function insert(original, index, string) {
    if (index > 0) {
      return original.substring(0, index) + string + original.substr(index);
    }

    return string + original;
  }
  if (req.method === "GET") {
    try {
      let afterPagePath = req.baseUrl.split("/").pop();
      let file = path.join(
        __dirname,
        "../../../app",
        "views",
        "pages",
        `${afterPagePath}.pug`
      );
      fs.existsSync(file, (exists) => {
        if (exists) {
          let pugFile = fs.readFileSync(file, "utf-8");
          if (pugFile.indexOf("include ./Navbar/Navbar") === -1) {
            pugFile = insert(
              pugFile,
              pugFile.indexOf("body") + "body".length + 9,
              "include ./Navbar/Navbar\n        "
            );
            fs.writeFileSync(file, pugFile, "utf-8");
          }
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  next();
};
