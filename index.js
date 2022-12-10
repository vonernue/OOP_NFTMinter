var connect = require('connect');
var express = require("express");
var request = require('request');
const fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');

app = express();

var buffer;
app.use(express.static(__dirname));
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html", function(err) {
    if (err) res.send(404);
  });
});

app.get("/script.js", function(req, res) {
  res.sendFile(__dirname + "/public/script.js", function(err) {
    if (err) res.send(404);
  });
});


app.post("/mint", function(req, res) {
  var image = req.body.image;
  image = image.replace('data:', '').replace(/^.+,/, '');
  buffer = Buffer.from(image,'base64');
  console.log(buffer.toString('base64'));
  res.send("upload");
});

port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});