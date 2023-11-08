import "../../../styles/TrackStation.css";
import TrackControls from "./TrackControls.jsx";
import TrackContainer from "./TrackContainer";

const TrackStation = () => {
  return (
    <div id="track-station-container">
      <TrackControls />
      <div id="tracks-and-stems">
        <TrackContainer />
        <TrackContainer />
        <div style={{height: "200px"}}>Bottom</div>
      </div>
    </div>
  )
}

export default TrackStation