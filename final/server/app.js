const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.post("/picture/post", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added'
  })

});

app.get("/picture/post",(req, res, next) => {
  const pictures= [
    {
      id:"12",
      name: "{ type: String, require: true}",
      description: "{ type: String, require: true}",
      location: "{ type: String, require: true}",
      imageUrl: "{ type: String, require: true}"
    },
    {
      id:"13",
      name: "{ 2type: String, require: true}",
      description: "{ type: String, require: true}",
      location: "{ type: String, require: true}",
      imageUrl: "{ type: String, require: true}"
    }
  ]
  res. status(200).json({
    message: "Post fecthed!",
    pictures: pictures
  });
});

module.exports = app;
