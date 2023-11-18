import "../../../styles/WorkStation.css";
import { useState, useEffect, useRef } from "react";
import MasterControls from "./MasterControls";
import TrackStation from "../TrackStation/TrackStation";

/**
 * Individual Track Structure
 * projectTracks: {
 *  ID: {
 *    id,
 *    name,
 *    muted,
 *    isolated,
 *    volume,
 *    src
 *  }
 * }
 */
const Tracks = {
    projectID: "1",
    trackCount: 0,
    projectTracks: {
    // "1": {
    //   id: "1",
    //   name: "Audio 1",
    //   muted: false,
    //   isolated: false,
    //   volume: 0
    // },
    // "2": {
    //   id: "2", 
    //   name: "Audio 2",
    //   muted: true,
    //   isolated: true,
    //   volume: 0
    // }
    }
};

const WorkStation = () => {
    console.log("work station component rerendered");
    /**
     * Master Control States
     * - play/pause
     * - volume
     * - recording
     */
    const [isPlaying, setIsPlaying] = useState(false);
    const [masterVolume, setMasterVolume] = useState(0.0);
    const [isRecording, setIsRecording] = useState(false);

    /**
     * Project Track states
     */
    const [projectTracks, setProjectTracks] = useState(null);
    const [trackCount, setTrackCount] = useState(0);
    const [selectedTrack, setSelectedTrack] = useState();

    /**
     * media Recorder refs
     */
    const mediaRecorder = useRef();
    const chunks = useRef([]);

    /**
     * Project Track Refs
     */
    function generateUniqueID() {
        return Math.random().toString(36).slice(2, 9);
    }

    /**
     * Master Control Methods
     * - play/pause
     * - volume
     * - recording
     */
    function togglePlayPause() {
        if (isPlaying) {
            //
        }
        setIsPlaying(!isPlaying);
    }

    function onChangeMasterVolume(value) {
        setMasterVolume(value);
    }

    function startRecording() {
        mediaRecorder.current.start();
        setIsRecording(true);
    }

    function stopRecording() {
        mediaRecorder.current.stop();
        setIsRecording(false);
    }

    /**
     * Project Tracks manipulation
     */
    function printTracks() {
        console.log(projectTracks);
    }

    function createNewTrack() {
        let newTrackID = generateUniqueID();
        let newTrackCount = trackCount + 1;

        const newTrack = {
            id: newTrackID,
            name: "Audio " + newTrackCount.toString(),
            muted: false,
            isolated: false,
            volume: 0,
            src: null,
        }
        setProjectTracks(prevTracks => ({
            ...prevTracks,
            [newTrackID]: newTrack
        }));

        setSelectedTrack(newTrackID);
        setTrackCount(newTrackCount);
    }

    function toggleTrackMute(trackID) {
      if (projectTracks && projectTracks[trackID]) {
            const updatedTracks = {
                ...projectTracks,
                [trackID]: {
                    ...projectTracks[trackID],
                    muted: !projectTracks[trackID].muted,
                },
            };

            setProjectTracks(updatedTracks);
        }
    }

    function toggleTrackIsolation(trackID) {
        if (projectTracks && projectTracks[trackID]) {
            const updatedTracks = {
                ...projectTracks,
                [trackID]: {
                    ...projectTracks[trackID],
                    isolated: !projectTracks[trackID].isolated,
                },
            };

            setProjectTracks(updatedTracks);
        }
    }

    function changeTrackVolume(trackID, value) {
        console.log("changeTrackvol")
        if (projectTracks && projectTracks[trackID]) {
            const updatedTracks = {
                  ...projectTracks,
                    [trackID]: {
                        ...projectTracks[trackID],
                        volume: value,
                    },
                };

            setProjectTracks(updatedTracks);
        }
    }

    function deleteTrack(trackID) {
        if (projectTracks && projectTracks[trackID]) {
            const updatedTracks = { ...projectTracks };
            delete updatedTracks[trackID];
            setProjectTracks(updatedTracks);
            setTrackCount(trackCount - 1);
        }
    }

    function changeSelectedTrack(trackID) {
        setSelectedTrack(trackID);
    }

    function assignTrackSource(trackID, blob) {
        const updatedTracks = {
            ...projectTracks,
            [trackID]: {
                ...projectTracks[trackID],
                src: blob
            }
        }

        setProjectTracks(updatedTracks);
    }

    useEffect(() => {
        console.log("useeffect in workstation");
        setProjectTracks(Tracks.projectTracks);
        setTrackCount(Tracks.trackCount);

        /**
         * Media Recorder setup
         */
        // check whether getUserMedia is supported
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then((stream) => {
                mediaRecorder.current = new MediaRecorder(stream);

                mediaRecorder.current.ondataavailable = (e) => {
                    chunks.current.push(e.data);
                }

                mediaRecorder.current.onstop = () => {
                    const blob = new Blob(chunks.current, { type: "audio/ogg; codecs=opus" });
                    assignTrackSource(selectedTrack, blob);
                    chunks.current = [];
                }
            }).catch((err) => {
                console.err(`getUserMedia error occurred: ${err}`);
            });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, []);
    
    return (
        <div id="work-station-container">
            <button onClick={() => printTracks()} id="print-tracks">print tracks</button>
            <MasterControls 
                isPlaying={isPlaying} 
                togglePlayPause={togglePlayPause} 
                masterVolume={masterVolume} 
                onChangeMasterVolume={onChangeMasterVolume}
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
            />
            <TrackStation 
                projectTracks={projectTracks} 
                createNewTrack={createNewTrack}
                toggleTrackMute={toggleTrackMute}
                toggleTrackIsolation={toggleTrackIsolation}
                changeTrackVolume={changeTrackVolume}
                deleteTrack={deleteTrack}
                selectedTrack={selectedTrack}
                changeSelectedTrack={changeSelectedTrack}
            />
        </div>
    )
};

export default WorkStation;