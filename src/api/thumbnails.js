const config = require("../config");
const fs = require("fs");
const path = require("path");

async function get(imageID) {
  const dir = config.thumbnailsDir;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (file === imageID) {
      const relativePath = `./${dir}/${imageID}`;
      return path.resolve(relativePath);
    }
  }
  throw "No image found";
}

module.exports = { get };
