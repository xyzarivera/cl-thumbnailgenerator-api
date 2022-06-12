const request = require("supertest");
const app = require("./app");
const fs = require("fs");

describe("/thumbnail", () => {
  it.only("POST /thumbnails - should be able to upload a file", (done) => {
    const testImagePath = "./test/assets/testImage.png";
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
        expect(fs.existsSync("./test/storage/testImage.png")).toBe(true);
        fs.unlinkSync("./test/storage/testImage.png");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
