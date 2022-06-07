const configJson = require("../config.json");
const config = configJson[process.env.NODE_ENV ?? "development"];

module.exports = config;
