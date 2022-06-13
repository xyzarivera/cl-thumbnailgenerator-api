const fs = require("fs");
const _thumbnailGenerator = require("../thumbnailGenerator/generator");
const config = require("../src/config");

describe("thumbnailGenerator", () => {
  // eslint-disable-next-line no-undef
  afterAll(() => {
    fs.unlink(`${config.thumbnailsDir}/testImage.png`, function (err) {});
  });
  it("should be able resize an image to 100x100 pixels", async () => {
    const fileName = "testImage.png";
    try {
      await _thumbnailGenerator({
        id: fileName,
        imagePath: `./test/assets/${fileName}`,
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line no-undef
    expect(fs.existsSync(`${config.thumbnailsDir}/testImage.png`)).toBe(true);
  });
  it("should throw an error", async () => {
    const fileName = "testImage.png";
    try {
      await _thumbnailGenerator({
        id: fileName,
        imagePath: `./test/testImage.png`,
      });
    } catch (error) {
      // eslint-disable-next-line no-undef
      expect(error.message).toEqual(
        "Input file is missing: ./test/testImage.png"
      );
    }
  });
});
