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
// const buffer = Buffer.from(arrayBuffer);

captureButton.addEventListener('click', function() {
  var buffer;
  snapshot.getContext('2d').canvas.toBlob(buffer);
  console.log(buffer)
  fetch('http://localhost:3000/mint', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
      "img": buffer
    }
  })
  .then(response => response.json())
  .then(response => console.log(JSON.stringify(response)))
  // console.log(context)
  context.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
  var image_url = document.getElementById("snapshot").toDataURL("image/png");
  // console.log(image_url);
});
