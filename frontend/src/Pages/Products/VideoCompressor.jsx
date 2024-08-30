const VideoCompressor = async (file, targetSizeMB = 1.8, duration = 30) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.muted = false; 

    video.addEventListener('loadedmetadata', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth / 2; 
      canvas.height = video.videoHeight / 2; 

      const canvasStream = canvas.captureStream();

      const videoStream = video.captureStream();

      const audioTrack = videoStream.getAudioTracks()[0];

      if (audioTrack) {
        canvasStream.addTrack(audioTrack);
      }

      const targetSizeBytes = targetSizeMB * 1024 * 1024;
      const bitrate = (targetSizeBytes * 8) / duration; 

      const options = {
        mimeType: 'video/webm; codecs=vp9',
        videoBitsPerSecond: bitrate
      };

      const mediaRecorder = new MediaRecorder(canvasStream, options);
      const chunks = [];
      const maxDuration = duration * 1000; 

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve({ base64 });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      };

      video.onerror = () => reject(new Error('Error loading video'));
      mediaRecorder.onerror = (event) => reject(new Error(`MediaRecorder error: ${event.error}`));
      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, maxDuration);

      video.onplay = () => {
        const drawFrame = () => {
          if (video.paused || video.ended) return;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame);
        };
        drawFrame();
      };

      video.play();
    });
    video.onerror = () => reject(new Error('Error loading video'));
  });
};

export default VideoCompressor;
