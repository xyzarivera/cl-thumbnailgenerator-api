const configJson = require("./config.json");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];

module.exports = config;
