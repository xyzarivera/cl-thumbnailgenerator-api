const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const config = require("./config");
const { get } = require("./api/thumbnails");
const thumbnailGeneratorQueue = require("./thumbnailGenerator");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(morgan("dev"));

app.post("/thumbnails", async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).send({
        message: "No file uploaded",
      });
    } else {
      const { image } = req.files;
      const { name } = image;
      image.mv(`${config.storageDir}/${name}`);

      // queue
      thumbnailGeneratorQueue.add({
        id: name,
        imagePath: `${config.storageDir}/${name}`,
      });

      res.json({
        id: name,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/thumbnails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await get(id);
    res.sendFile(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = app;
