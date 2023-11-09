import "../../../styles/WorkStation.css";
import { useState } from "react";
import MasterControls from "./MasterControls";
import TrackStation from "../TrackStation/TrackStation";

const WorkStation = () => {
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
  
  return (
    <div id="work-station-container">
      <MasterControls 
        isPlaying={isPlaying} 
        togglePlayPause={togglePlayPause} 
        masterVolume={masterVolume} 
        onChangeMasterVolume={onChangeMasterVolume}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      <TrackStation />
    </div>
  )
};

export default WorkStation;