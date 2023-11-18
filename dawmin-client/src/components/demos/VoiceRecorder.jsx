import { useEffect, useRef } from 'react';

const VoiceRecorder = () => {
    const mediaRecorder = useRef();
    const chunks = useRef([]);
    const audioContext = useRef(new AudioContext());

    const recordAudio = () => {
        mediaRecorder.current.start();
        console.log(mediaRecorder.current.state);
        console.log("recorder started");
    };

    const stopRecordAudio = () => {
        mediaRecorder.current.stop();
        console.log(mediaRecorder.current.state);
        console.log("recorder stopped");
    }

    const playRecording = blob => {
        console.log("blob received, about to play")
        console.log("blob:", blob);
        const fileReader = new FileReader();
        fileReader.onload = function () {
            audioContext.current.decodeAudioData(fileReader.result, function(buffer) {
                const source = audioContext.current.createBufferSource();
                source.buffer = buffer;

                source.connect(audioContext.current.destination);
                source.start();
            });
        };

        fileReader.readAsArrayBuffer(blob);
    };

    useEffect(() => {
        // check whether getUserMedia is supported
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported!");
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then((stream) => {
                console.log("creating MediaRecorder()");
                mediaRecorder.current = new MediaRecorder(stream);

                mediaRecorder.current.ondataavailable = (e) => {
                    console.log("data available");
                    chunks.current.push(e.data);
                }

                mediaRecorder.current.onstop = () => {
                    console.log("creating blob");
                    const blob = new Blob(chunks.current, { type: "audio/ogg; codecs=opus"});
                    chunks.current = [];
                    playRecording(blob);
                }
            }).catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, []);

    return (
        <div>
            <div>VoiceRecorder</div>
            <button onClick={() => recordAudio()}>Record</button>
            <button onClick={() => stopRecordAudio()}>stopRecord</button>
        </div>
    )
}

export default VoiceRecorder;