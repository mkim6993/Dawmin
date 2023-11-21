import "../../../styles/TrackStation.css";
import TrackControls from "./TrackControls.jsx";
import TrackContainer from "./TrackContainer";

const TrackStation = ({ 
    projectTracks, 
    toggleTrackMute, 
    toggleTrackIsolation, 
    createNewTrack,
    changeTrackVolume,
    deleteTrack, 
    selectedTrack,
    changeSelectedTrack,
    isRecording
}) => {

    return (
        <div id="track-station-container">
            <TrackControls createNewTrack={createNewTrack} />
            <div id="tracks-and-stems">
                {projectTracks && Object.values(projectTracks)?.map((track) => (
                    <TrackContainer 
                        key={track.id} 
                        track={track} 
                        toggleTrackMute={toggleTrackMute}
                        toggleTrackIsolation={toggleTrackIsolation}
                        changeTrackVolume={changeTrackVolume}
                        deleteTrack={deleteTrack}
                        selectedTrack={selectedTrack}
                        changeSelectedTrack={changeSelectedTrack}
                        isRecording={isRecording}
                    />
                ))}
                <div style={{height: "200px"}}>Bottom{selectedTrack}</div>
            </div>
        </div>
    )
}

export default TrackStation;