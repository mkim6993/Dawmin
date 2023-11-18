import "../../../styles/TrackStems.css";

const TrackStems = ({ src }) => {
  return (
    <div style={{backgroundColor: src ? "green" : "red"}}>
        <div>
            Hello this is TrackStems
        </div>
    </div>
  )
};

export default TrackStems;