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
    console.log("work station component rendered");
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
    const [selectedTrack, setSelectedTrack] = useState(null);

    /**
     * media refs
     */
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);
    const audioContext = useRef();
    // const source = useRef();

    /**
     * Generate unique id for each new track
     */
    function generateUniqueID() {
        return Math.random().toString(36).slice(2, 9);
    }

    /**
     * ------------------------------------------------------
     * Master Control Methods
     * - play/pause
     * - volume
     * - recording
     * ------------------------------------------------------
     */

    /**
     * Toggle the play and pause function
     */
    function togglePlayPause() {
        if (JSON.stringify(projectTracks) != "{}") {
            if (isPlaying) {
                console.log("currently playing, intention to pause");
            } else {
                playAllStems()
            }
            setIsPlaying(!isPlaying);
        }
    }

    /**
     * play single audio blob using audioContext
     */
    async function playSingleStem(blob) {
        const audioBuffer = await audioContext.current.decodeAudioData(await blob.arrayBuffer());
        const source = audioContext.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.current.destination);

        source.start(audioContext.current.currentTime);
        return source
    }

    /**
     * play all audio blobs in the project
     */
    async function playAllStems() {
        Object.keys(projectTracks).forEach(async trackId => {
            const track = projectTracks[trackId];
            if (track.src !== null && track.muted === false) {
                await playSingleStem(track.src);
                console.log(`Track ${trackId} source: ${track.src}`);
            }
        });
    }

    /**
     * change the volume of the project
     * @param {*} value 
     */
    function onChangeMasterVolume(value) {
        setMasterVolume(value);
    }

    /**
     * start recording using mediaRecorder
     */
    function startRecording() {
        if (mediaRecorder.current && selectedTrack) {
            mediaRecorder.current.start();
            setIsRecording(true);
        }
    }

    /**
     * stop mediaRecording from recording
     */
    function stopRecording() {
        mediaRecorder.current.stop();
        setIsRecording(false);
    }

    /**
     * ------------------------------------------------------
     * Project Tracks manipulation
     * ------------------------------------------------------
     */

    /**
     * print projectTracks to the console
     */
    function printTracks() {
        console.log(projectTracks);
        console.log(selectedTrack);
        console.log(projectTracks[selectedTrack].name);
    }

    /**
     * Create a new track 
     * - generate ID
     * - update project details
     * - add track to projectTracks
     */
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

    /**
     * Mute a selected track
     * @param {*} trackID 
     */
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

    /**
     * isolate a selected Track
     * @param {*} trackID 
     */
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

    /**
     * change the volume of a selected track
     * @param {*} trackID 
     * @param {*} value 
     */
    function changeTrackVolume(trackID, value) {
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

    /**
     * delete a track from projectTracks
     * @param {*} trackID 
     */
    function deleteTrack(trackID) {
        if (projectTracks && projectTracks[trackID]) {
            const updatedTracks = { ...projectTracks };
            delete updatedTracks[trackID];
            if (trackCount - 1 > 0) {
                setSelectedTrack(JSON.stringify(Object.keys(updatedTracks)[Object.keys(updatedTracks).length - 1]));
            } else {
                setSelectedTrack(null);
            }
            setTrackCount(trackCount - 1);
            setProjectTracks(updatedTracks);
        }
    }

    /**
     * change the "selected" track
     * @param {*} trackID 
     */
    function changeSelectedTrack(trackID) {
        setSelectedTrack(trackID);
    }

    /**
     * add blob to src of the corresponding track
     * @param {*} trackID 
     * @param {*} blob 
     */
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

    /**
     * upon component render...
     * - fetch project data
     * - set projectTracks
     * - get MediaDevice input
     * - instantiate mediaRecorder and audioContext
     */
    useEffect(() => {
        console.log("useEffect in workstation");
        setProjectTracks(Tracks.projectTracks);
        setTrackCount(Tracks.trackCount);

        /**
         * Check if getUserMedia is available on browser
         */
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then((stream) => {
                mediaRecorder.current = new MediaRecorder(stream);
                audioContext.current = new AudioContext();

            }).catch((err) => {
                console.err(`getUserMedia error occurred: ${err}`);
            });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, []);

    /**
     * Listen for new mediaRecorder events (ondataavailable, onstop) every time a new track is selected...
     * - push chunks to convert to blob
     * - convert chunks to blob
     */
    useEffect(() => {
        if (mediaRecorder.current && selectedTrack) {
            mediaRecorder.current.ondataavailable = (e) => {
                chunks.current.push(e.data);
            }

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(chunks.current, { type: "audio/mpeg" });
                assignTrackSource(selectedTrack, blob);
                chunks.current = [];
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTrack]);
    
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
                isRecording={isRecording}
            />
        </div>
    )
};

export default WorkStation;