// Assuming audioBlob1 and audioBlob2 are your audio blobs
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to combine two audio blobs into a single AudioBuffer
async function combineAudioBlobs(blob1, blob2) {
  const buffer1 = await audioContext.decodeAudioData(await blob1.arrayBuffer());
  const buffer2 = await audioContext.decodeAudioData(await blob2.arrayBuffer());

  // Calculate the total duration of the combined buffers
  const totalDuration = Math.max(buffer1.duration, buffer2.duration);

  // Create a new buffer with the combined duration
  const combinedBuffer = audioContext.createBuffer(
    buffer1.numberOfChannels,
    audioContext.sampleRate * totalDuration,
    audioContext.sampleRate
  );

  // Copy the audio data from buffer1 and buffer2 into the combined buffer
  for (let channel = 0; channel < combinedBuffer.numberOfChannels; channel++) {
    const channelData = combinedBuffer.getChannelData(channel);
    channelData.set(buffer1.getChannelData(channel), 0);
    channelData.set(buffer2.getChannelData(channel), buffer1.length);
  }

  return combinedBuffer;
}

// Combine the audio blobs into a single buffer
combineAudioBlobs(audioBlob1, audioBlob2).then(combinedBuffer => {
  // Create an AudioBufferSourceNode and play the combined audio
  const source = audioContext.createBufferSource();
  source.buffer = combinedBuffer;
  source.connect(audioContext.destination);
  source.start();
});
