import "../../../styles/MasterControls.css";
import { IoPlay, IoPause, IoPlaySkipBack, IoEllipse } from "react-icons/io5";
import VolumeSlider from "./VolumeSlider";

const MasterControls = ({ isPlaying, togglePlayPause, masterVolume, onChangeMasterVolume }) => {

  return (
    <div id="master-controls-container">
      <div id="audio-player-controls">
        <IoPlaySkipBack size={"28px"}/>
        { isPlaying ? <IoPause size={"28px"} onClick={togglePlayPause} /> : <IoPlay size={"28px"} onClick={togglePlayPause} />}
        <IoEllipse size={"25px"}/>
      </div>
      <VolumeSlider masterVolume={masterVolume} onChangeMasterVolume={onChangeMasterVolume}/>
    </div>
  )
};

export default MasterControls;