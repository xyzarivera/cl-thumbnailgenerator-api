const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const { get } = require("../api/thumbnails");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

      // mock thumbnail generator
      image.mv(`${config.thumbnailsDir}/${name}`);

      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          id: name,
          mimetype: image.mimetype,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/thumbnails/:id", async (req, res) => {
  const { id } = req.params;

  const response = await get(id);
  res.sendFile(response);
});

module.exports = app;
