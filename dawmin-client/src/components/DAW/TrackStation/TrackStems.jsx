import "../../../styles/TrackStems.css";

const TrackStems = ({ src, isRecording }) => {
  return (
    <div style={{backgroundColor: isRecording ? "red" : ""}}>
        <div style={{backgroundColor: src ? "green" : ""}}>
            Hello this is TrackStems
        </div>
    </div>
  )
};

export default TrackStems;