import "../../../styles/TrackContainer.css";
import TrackStems from "./TrackStems";
import TrackProfile from "./TrackProfile";

const TrackContainer = ({ track }) => {
  return (
    <div id="track-container">
        <TrackProfile track={track}/>
        <TrackStems />
    </div>
  )
}

export default TrackContainer