// import * as fs from 'fs';
// import fetch from "node-fetch";
// Start Cam function


const startCam = () => {
  //Initialize video
  const video = document.getElementById("video");

  // validate video element
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }
};

// Stop the webcam function
const stopCam = () => {
  canvas.getContext('2d').drawImage(video.srcObject, 0, 0, canvas.width, canvas.height);
  let stream = video.srcObject;
  let tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;
};

$(() => {
  startCam();
});

var captureButton = document.getElementById('capture');
var snapshotCanvas = document.getElementById('snapshot');
var scanAddress = document.getElementById('scanAddress');
var mintBtn = document.getElementById('mintBtn');
var walletAddress = '';
var image = '';

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  scanAddress.innerHTML = decodedText;
  walletAddress = decodedText;
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  // console.warn(`Code scan error = ${error}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
/* verbose= */ false);


captureButton.addEventListener('click', function () {

  var context = snapshot.getContext('2d');
  context.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

  image = document.getElementById("snapshot").toDataURL("image/png")

});

UIkit.util.on('#scannerModal', 'show', function () {
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});

mintBtn.addEventListener('click', function () {
  const requestData = {
    image: image,
    walletAddress: walletAddress
  };

  fetch('/mint', {
    body: JSON.stringify(requestData),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  })
    .then((response) => {
      console.log(response.json())
      return response
    })


});


