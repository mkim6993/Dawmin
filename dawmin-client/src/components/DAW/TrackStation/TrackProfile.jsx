import "../../../styles/TrackProfile.css";
import TrackVolumeSlider from "./TrackVolumeSlider";

const TrackProfile = () => {
  return (
    <div id="track-profile-container">
        <div>
            Audio 1
        </div>
        <div className="single-track-controls-container">
            <TrackVolumeSlider />
        </div>
    </div>
  )
}

export default TrackProfile