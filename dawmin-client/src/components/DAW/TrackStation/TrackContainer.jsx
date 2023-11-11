import "../../../styles/TrackContainer.css";
import TrackStems from "./TrackStems";
import TrackProfile from "./TrackProfile";

const TrackContainer = ({ 
  track, 
  toggleTrackMute, 
  toggleTrackIsolation,
  changeTrackVolume,
  deleteTrack,
}) => {
  return (
    <div id="track-container">
        <TrackProfile 
          track={track} 
          toggleTrackMute={toggleTrackMute} 
          toggleTrackIsolation={toggleTrackIsolation}
          changeTrackVolume={changeTrackVolume}
          deleteTrack={deleteTrack}
        />
        <TrackStems />
    </div>
  )
};

export default TrackContainer;