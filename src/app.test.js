const request = require("supertest");
const app = require("./app");
const fs = require("fs");
const config = require("./config");

/**TODO
 * 1. mock thumbnailGeneratorQueue
 */

describe("/thumbnail", () => {
  // eslint-disable-next-line no-undef
  afterAll(() => {
    fs.unlinkSync(`${config.storageDir}/testImage.png`);
    fs.unlinkSync(`${config.thumbnailsDir}/testImage.png`);
  });
  it("POST /thumbnails - should be able to upload a file", (done) => {
    const testImagePath = `${config.assetsDir}/testImage.png`;
    request(app)
      .post("/thumbnails")
      .attach("image", testImagePath)
      .expect(200)
      .expect({
        status: true,
        message: "File is uploaded",
        data: {
          id: "testImage.png",
          mimetype: "image/png",
        },
      })
      .expect(() => {
        // eslint-disable-next-line no-undef
        expect(fs.existsSync(`${config.storageDir}/testImage.png`)).toBe(true);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("GET /thumbnails/:id - should be able to return the thumbnail given an id", (done) => {
    request(app)
      .get("/thumbnails/testImage.png")
      .expect(200)
      .expect("Content-Type", "image/png")
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
