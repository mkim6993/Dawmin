import { useState } from "react";

const VoiceRecorder = () => {
    const [microphonePermissionState, setMicrophonePermissionState] = useState("denied");
    const [availableAudioDevices, setAvailableAudioDevices] = useState([]);
    const [selectedAudioDevice, setSelectedAudioDevice] = useState(undefined);

    function handlePermissionState(state) {
        setMicrophonePermissionState(state);
        if (state == "granted") {
            getAvailableAudioDevices().then((devices) => {
                setAvailableAudioDevices(devices);
                setSelectedAudioDevice(devices.find((device) => device.id === "default")?.id);
            })
        }
    }

    navigator.permissions.query({ name: "microphone" }).then(function(queryResult) {
        handlePermissionState(queryResult.state);
        queryResult.onchange = function(onChangeResult) {
            if (onChangeResult.target) {
                console.log("changed", (onChangeResult.target.state));
            }
        }
    });

    function getAvailableAudioDevices() {
        return new Promise((resolve) => {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const availableDevices = devices
                    .filter((d) => d.kind === "audioinput")
                    .map((d) => {
                        return { id: d.deviceId, name: d.label };
                    });
                resolve(availableDevices);
            });
        });
    }

    function handleClick(id) {
        setSelectedAudioDevice(id);
    }

    const list = availableAudioDevices.map((d) => (
        <div key={d.id} className="available-devices" onClick={() => handleClick(d.id)}>
            <div>
                {d.name}
            </div>
            <div>
                {d.id}
            </div>
        </div>
    ));
    
    
    return (
        <div>
            <div>Javascript Audio</div>
            {/* microphonePermissionState() === "granted" && <div>permission granted<div/> */
                microphonePermissionState === "granted" ? (<div>permission granted</div>) : (<div></div>)
            }
            {/* microphonePermissionState() === "granted" && <div>permission granted<div/> */
             microphonePermissionState === "granted" ? (
                <div>
                    {list}
                    hi
                </div>
                ) : (<div></div>)
            }

            {/* microphonePermissionState() === "granted" && <div>permission granted<div/> */
            microphonePermissionState === "prompt" ? (<div>please grant permission</div>) : (<div></div>)
            }

            {/* microphonePermissionState() === "granted" && <div>permission granted<div/> */
            microphonePermissionState === "denied" ? (<div>permission denied</div>) : (<div></div>)
            }
        </div>
    )
};

export default VoiceRecorder;