const sharp = require("sharp");
const config = require("../src/config");

async function _thumbnailGenerator(imageData) {
  const { id, imagePath } = imageData;

  sharp(imagePath)
    .resize(100, 100)
    .toFile(`${config.thumbnailsDir}/${id}`, function (err) {
      if (err) {
        throw err;
      }
    });
}

module.exports = _thumbnailGenerator;
