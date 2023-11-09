import "../../../styles/WorkStation.css";
import { useState, useEffect } from "react";
import MasterControls from "./MasterControls";
import TrackStation from "../TrackStation/TrackStation";

const Tracks = [
  {
    id: 1,
    name: "Audio 1",
    muted: false,
    isolated: false,
    volume: 0
  },
  {
    id:2, 
    name: "Audio 2",
    muted: true,
    isolated: true,
    volume: 0
  }
];

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

  /**
   * Master Control Methods
   * - play/pause
   * - volume
   * - recording
   */
  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  function onChangeMasterVolume(value) {
    setMasterVolume(value);
  }

  function startRecording() {
    setIsRecording(true);
  }

  function stopRecording() {
    setIsRecording(false);
  }

  /**
   * Project Tracks manipulation
   */
  function printTracks() {
    console.log(projectTracks);
  }

  function addTrack() {
    const sampleTrack = {
      id: 3,
      name: "sampleTrack",
      muted: false,
      isolated: false,
      volume: 0
    }
    setProjectTracks([...projectTracks, sampleTrack])
  }

  useEffect(() => {
    console.log("useeffect in workstation")
    setProjectTracks(Tracks);
  }, []);
  
  return (
    <div id="work-station-container">
      <button onClick={() => printTracks()} id="print-tracks">print tracks</button>
      <button onClick={() => addTrack()} id="add-tracks">add track</button>
      <MasterControls 
        isPlaying={isPlaying} 
        togglePlayPause={togglePlayPause} 
        masterVolume={masterVolume} 
        onChangeMasterVolume={onChangeMasterVolume}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      <TrackStation projectTracks={projectTracks} />
    </div>
  )
};

export default WorkStation;