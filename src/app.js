const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

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
      image.mv(`./uploads/${name}`);

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

module.exports = app;
