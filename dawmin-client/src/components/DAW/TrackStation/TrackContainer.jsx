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
    changeSelectedTrack,
    isRecording
}) => {
    return (
        <div id="track-container" onClick={() => changeSelectedTrack(track.id)}>
            <TrackProfile 
                track={track} 
                toggleTrackMute={toggleTrackMute} 
                toggleTrackIsolation={toggleTrackIsolation}
                changeTrackVolume={changeTrackVolume}
                deleteTrack={deleteTrack}
                isTrackSelected={track.id === selectedTrack}
            />
            {track.id == selectedTrack ? (<div>yes</div>) : (<div>no</div>)}
            <TrackStems 
                id={track.id}
                src={track.src} 
                isRecording={isRecording}
                selectedTrack={selectedTrack}  
              />
        </div>
    )
};

export default TrackContainer;