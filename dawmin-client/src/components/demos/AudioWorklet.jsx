import React, { useEffect, useRef } from 'react';

const AudioPlayer = () => {
    const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());

    const playAudio = async (audioBlob, startTime = 0) => {
        const audioBuffer = await audioContextRef.current.decodeAudioData(await audioBlob.arrayBuffer());
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);

        // Schedule the start time precisely using the currentTime property
        source.start(audioContextRef.current.currentTime + startTime);

        // Adjust the start time for the next source
        return source;
    };

    useEffect(() => {
        const playAllAudio = async () => {
            const source1 = await playAudio(audioBlob1, 0);
            const source2 = await playAudio(audioBlob2, 0);
            // You can continue to schedule and play more sources as needed
          };
          
        playAllAudio();

        // Clean up the AudioContext when the component unmounts
        return () => {
        audioContextRef.current.close();
        };
    }, []); // Run the effect once on mount

    return <div>Audio is playing...</div>;
};

export default AudioPlayer;
