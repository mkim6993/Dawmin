import "../../../styles/MasterControls.css";
import { IoPlay, IoPlaySkipBack, IoEllipse } from "react-icons/io5";
import VolumeSlider from "./VolumeSlider";

const MasterControls = 
  ({ 
    isPlaying, 
    togglePlayPause, 
    masterVolume, 
    onChangeMasterVolume, 
    isRecording,
    startRecording,
    stopRecording
  }) => {

  return (
    <div id="master-controls-container">
      <div id="audio-player-controls">
        <IoPlaySkipBack size={"24px"}/>
        { isPlaying ? <IoPlay size={"24px"} onClick={togglePlayPause} color={"green"} /> : <IoPlay size={"24px"} onClick={togglePlayPause} />}
        { isRecording ? <IoEllipse size={"23px"} color={"rgb(199, 2, 2)"} onClick={stopRecording} /> : <IoEllipse size={"23px"} onClick={startRecording} />}
      </div>
      <VolumeSlider masterVolume={masterVolume} onChangeMasterVolume={onChangeMasterVolume} />
    </div>
  )
};

export default MasterControls;