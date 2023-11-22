import "../../../styles/TrackStems.css";

const TrackStems = ({ id, src, isRecording, selectedTrack }) => {
    return (
        <div style={{backgroundColor: isRecording && (id === selectedTrack) ? "red" : ""}}>
            <div style={{backgroundColor: src ? "green" : ""}}>
                Hello this is TrackStems
            </div>
        </div>
    )
};

export default TrackStems;