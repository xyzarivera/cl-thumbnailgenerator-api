const fs = require("fs");
const _thumbnailGenerator = require("../thumbnailGenerator/generator");
const config = require("../src/config");

describe("thumbnailGenerator", () => {
  it("should be able resize an image to 100x100 pixels", () => {
    const name = "testImage.png";
    _thumbnailGenerator({
      id: name,
      imagePath: `${config.assetsDir}/${name}`,
    });
    // eslint-disable-next-line no-undef
    expect(fs.existsSync(`${config.thumbnailsDir}/testImage.png`)).toBe(true);
  });
  it("should throw an error", async () => {
    const name = "testImage.png";
    try {
      await _thumbnailGenerator({
        id: name,
        imagePath: `${config.assetsDir}/${name}`,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
