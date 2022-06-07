const express = require("express");

function setupApp() {
  const app = express();

  app.get("/hello", (req, res) => {
    res.send("hi");
  });

  return app;
}

module.exports = { setupApp };
