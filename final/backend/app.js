const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Picture = require("./models/picture");
const About = require("./models/about");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/final")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/final/pictures", (req, res, next) => {
  const picture = new Picture({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  console.log(picture);
  picture.save().then((createdPicture) => {
    res.status(201).json({
      message: "Picture added successfully",
      picture: createdPicture,
    });
  });
});

app.put("/final/pictures/:id", (req, res, next) => {
  Picture.findOne({ id: req.params.id })
    .then((picture) => {
      picture.title = req.body.title;
      picture.description = req.body.description;
      picture.imageUrl = req.body.imageUrl;

      Picture.updateOne({ id: req.params.id }, picture)
        .then((result) => {
          res.status(204).json({
            message: "Picture updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Picture not found.",
        error: { picture: "Picture not found" },
      });
    });
});

app.get("/final/pictures", (req, res, next) => {
  Picture.find().then((pictures) => {
    res.status(200).json(pictures);
  });
});

app.delete("/final/pictures/:id", (req, res, next) => {
  Picture.deleteOne({ id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Picture deleted!" });
  });
});

app.post("/final/about", (req, res, next) => {
  const about = new About({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  console.log(about);
  about.save().then((createdAbout) => {
    res.status(201).json({
      message: "About added successfully",
      about: createdAbout,
    });
  });
});

app.put("/final/about/:id", (req, res, next) => {
  About.findOne({ id: req.params.id })
    .then((about) => {
      about.title = req.body.title;
      about.description = req.body.description;
      about.imageUrl = req.body.imageUrl;

      About.updateOne({ id: req.params.id }, about)
        .then((result) => {
          res.status(204).json({
            message: "About updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "About not found.",
        error: { about: "About not found" },
      });
    });
});

app.get("/final/about", (req, res, next) => {
  About.find().then((abouts) => {
    res.status(200).json(abouts);
  });
});

app.delete("/final/about/:id", (req, res, next) => {
  About.deleteOne({ id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "about deleted!" });
  });
});
module.exports = app;