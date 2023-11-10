import "../../../styles/TrackContainer.css";
import TrackStems from "./TrackStems";
import TrackProfile from "./TrackProfile";

const TrackContainer = ({ track, toggleTrackMute, toggleTrackIsolation }) => {
  return (
    <div id="track-container">
        <TrackProfile 
          track={track} 
          toggleTrackMute={toggleTrackMute} 
          toggleTrackIsolation={toggleTrackIsolation}
          />
        <TrackStems />
    </div>
  )
}

export default TrackContainer