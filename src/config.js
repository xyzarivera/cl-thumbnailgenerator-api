const configJson = require("../config.json");
const config =
  configJson[process.env.NODE_ENV ?? "development"] ?? configJson.development;

module.exports = config;
