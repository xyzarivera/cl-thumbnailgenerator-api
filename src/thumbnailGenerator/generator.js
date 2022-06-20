const sharp = require("sharp");
const config = require("../config");

async function _thumbnailGenerator(imageData) {
  const { id, imagePath } = imageData;

  await sharp(imagePath)
    .resize(100, 100)
    .toFile(`${config.thumbnailsDir}/${id}`);
}

module.exports = _thumbnailGenerator;
