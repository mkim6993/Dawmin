import "../../../styles/TrackContainer.css";
import TrackStems from "./TrackStems";
import TrackProfile from "./TrackProfile";

const TrackContainer = ({ 
  track, 
  toggleTrackMute, 
  toggleTrackIsolation,
  changeTrackVolume,
  deleteTrack,
  selectedTrack,
  changeSelectedTrack
}) => {
  return (
    <div id="track-container" onClick={() => changeSelectedTrack(track.id)}>
        <TrackProfile 
          track={track} 
          toggleTrackMute={toggleTrackMute} 
          toggleTrackIsolation={toggleTrackIsolation}
          changeTrackVolume={changeTrackVolume}
          deleteTrack={deleteTrack}
          isTrackSelected={track.id == selectedTrack}
        />
        {selectedTrack}$$$$$
        {track.id}
        <TrackStems />
    </div>
  )
};

export default TrackContainer;