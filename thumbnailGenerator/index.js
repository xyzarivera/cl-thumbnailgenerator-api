const Queue = require("bull");
const fs = require("fs");
const path = require("path");
const config = require("../src/config");

const thumbnailGeneratorQueue = new Queue("thumbnail generating", {
  redis: { port: 6379, host: "127.0.0.1" },
});

thumbnailGeneratorQueue.process(function (job, done) {
  const oldPath = path.resolve(job.data.imagePath);
  const newPath = `${path.resolve(config.thumbnailsDir)}/${job.data.id}`;

  // mock thumbnail generator
  fs.copyFile(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log("Successfully copied file to thumbnails directory");
  });

  done();
});

module.exports = thumbnailGeneratorQueue;
