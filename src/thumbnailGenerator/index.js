const Queue = require("bull");
const thumbnailGenerator = require("./generator");

const REDIS_IP = process.env.REDIS_IP || "redis-queue";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const thumbnailGeneratorQueue = new Queue("thumbnail generating", {
  redis: { port: REDIS_PORT, host: REDIS_IP },
});

thumbnailGeneratorQueue.process(function async(job, done) {
  thumbnailGenerator(job.data);

  done();
});

module.exports = thumbnailGeneratorQueue;
