var connect = require('connect');
var express = require("express");
var https = require('https');
var request = require('request');
const fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var utils = require('./scripts/utils.js');
// var fileToIPFS = require('./scripts/fileToIPFS.js');

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

app = express();

var buffer;
app.use(express.static(__dirname));
// app.use(bodyParser.json());                        
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

async function getBlob(img) {
  const r = await fetch(img)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html", function (err) {
    if (err) res.send(404);
  });
});

app.get("/html5-qrcode.js", function (req, res) {
  res.sendFile(__dirname + "/public/html5-qrcode.js", function (err) {
    if (err) res.send(404);
  });
});

app.get("/script.js", function (req, res) {
  res.sendFile(__dirname + "/public/script.js", function (err) {
    if (err) res.send(404);
  });
});


app.post("/mint", async function (req, res) {
  var image = req.body.image;
  image = image.replace('data:', '').replace(/^.+,/, '');
  base64Data = Buffer.from(image, 'base64');
  var walletAddress = req.body.walletAddress;
  console.log(walletAddress);

  // save image to ipfs
  require("fs").writeFile("./img/out.png", base64Data, 'base64', function (err) {
    console.log(err);
  });

  // run detection.sh
  const { exec } = require("child_process");
  exec("sh shell/detection.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  let txn = await utils.mintNFT(base64Data, walletAddress);

  res.send(txn)
  // console.log(buffer.toString('base64'));
  // res.send("upload");
});

port = process.env.PORT || 5000;

// app.listen(port, function () {
//   console.log("Listening on " + port);
// });

var server = https.createServer(options, app);
server.listen(port, () => {
  console.log("server starting on port : " + port)
});