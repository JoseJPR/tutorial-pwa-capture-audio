// Default variables stream.
let globalStream = null;
let mediaRecorder = null;
let recordedChunks = [];
const config = {mimeType: 'audio/webm'};

// Init element dom references.
const buttonMicrophone = document.getElementById('buttonMicrophone');
const buttonDownload = document.getElementById('buttonDownload');

buttonMicrophone.addEventListener('mousedown', () => {

  // Add class animation loop.
  buttonMicrophone.classList.add('animation-loop');

  // Init instance MediaRecorder.
  mediaRecorder = new MediaRecorder(globalStream, config);  
  
  // Event for save data recorered into array chunks.
  mediaRecorder.addEventListener('dataavailable', (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  });

  // Event stop where you can execute custom actions.
  mediaRecorder.addEventListener('stop', function() {
    console.log('addEventListener stop');

    // Create object url from blob.
    const objectRef = URL.createObjectURL(new Blob(recordedChunks));

    // Set button download href object reference and file name and extension;
    buttonDownload.href = objectRef;
    buttonDownload.download = 'record.wav';

    // Set player src object reference;
    player.src = objectRef;

    // Reset instance recorder.
    recordedChunks = [];
    mediaRecorder = null;
  });


  // Event start where you can execute custom actions.
  mediaRecorder.addEventListener('start', function() {
    console.log('addEventListener start');
  });

  // Event error where you can execute custom actions.
  mediaRecorder.addEventListener('error', function(err) {
    console.error('addEventListener error', err);
  });

  // Start recorder event of media recorder instance.
  mediaRecorder.start();
});

buttonMicrophone.addEventListener('mouseup', () => {
  // Remove class animation loop.
  buttonMicrophone.classList.remove('animation-loop');

  // Stop recorder event of media recorder instance.
  mediaRecorder.stop();
});

// Active permisions of navigator for record audio.
navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then((stream) => { 
    globalStream = stream;
  });