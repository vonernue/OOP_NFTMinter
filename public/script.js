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
      .catch(function(error) {
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

captureButton.addEventListener('click', function() {
  var context = snapshot.getContext('2d');
  context.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

  const requestData = {
    image: document.getElementById("snapshot").toDataURL("image/png")
  }

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


