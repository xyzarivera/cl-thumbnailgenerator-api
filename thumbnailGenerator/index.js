const Queue = require("bull");
const _thumbnailGenerator = require("./generator");

const thumbnailGeneratorQueue = new Queue("thumbnail generating", {
  redis: { port: 6379, host: "127.0.0.1" },
});

thumbnailGeneratorQueue.process(function async(job, done) {
  _thumbnailGenerator(job.data);

  done();
});

module.exports = thumbnailGeneratorQueue;
