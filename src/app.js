const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const crypto = require("crypto");

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
      const imageID = crypto.randomUUID();
      const imageType = image.mimetype.split("/")[1];
      image.mv(`./uploads/${imageID}.${imageType}`);
      console.log(image);

      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          id: imageID,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
