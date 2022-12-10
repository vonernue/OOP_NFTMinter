var connect = require('connect');
var express = require("express");
var request = require('request');

app = express()

app.use(express.static(__dirname));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html", function(err)     {
        if (err) res.send(404);
  });
});

app.get("/script.js", function(req, res) {
  res.sendFile(__dirname + "/public/script.js", function(err)     {
        if (err) res.send(404);
  });
});

app.post("/mint", function(req, res) {
    console.log(req.body);
    res.sendStatus(200);
});


port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});