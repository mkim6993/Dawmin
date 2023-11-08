import "../../../styles/WorkStation.css";
import { useState } from "react";
import MasterControls from "./MasterControls";
import TrackStation from "../TrackStation/TrackStation";

const WorkStation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.0); 

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  function onChangeMasterVolume(value) {
    setMasterVolume(value);
  }
  
  return (
    <div id="work-station-container">
      <MasterControls isPlaying={isPlaying} togglePlayPause={togglePlayPause} masterVolume={masterVolume} onChangeMasterVolume={onChangeMasterVolume} />
      <TrackStation />
    </div>
  )
};

export default WorkStation;