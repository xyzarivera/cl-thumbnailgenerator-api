const Queue = require("bull");
const fs = require("fs");
const path = require("path");
const config = require("../src/config");

const thumbnailGeneratorQueue = new Queue("thumbnail generating", {
  redis: { port: 6379, host: "127.0.0.1" },
});

thumbnailGeneratorQueue.process(function (job, done) {
  // mock thumbnail generator

  done();
});

module.exports = thumbnailGeneratorQueue;
