import "../../../styles/TrackContainer.css";
import TrackStems from "./TrackStems";
import TrackProfile from "./TrackProfile";

const TrackContainer = () => {
  return (
    <div id="track-container">
        <TrackProfile />
        <TrackStems />
    </div>
  )
}

export default TrackContainer