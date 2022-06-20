const Queue = require("bull");
const _thumbnailGenerator = require("./generator");

const REDIS_IP = process.env.REDIS_IP || "redis-queue";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const thumbnailGeneratorQueue = new Queue("thumbnail generating", {
  redis: { port: REDIS_PORT, host: REDIS_IP },
});

thumbnailGeneratorQueue.process(function async(job, done) {
  _thumbnailGenerator(job.data);

  done();
});

module.exports = thumbnailGeneratorQueue;
