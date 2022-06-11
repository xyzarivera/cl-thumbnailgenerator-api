const request = require("supertest");
const app = require("./app");

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
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
