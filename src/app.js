const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("hi");
});

module.exports = app;
