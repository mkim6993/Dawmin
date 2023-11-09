import "../../../styles/TrackStation.css";
import TrackControls from "./TrackControls.jsx";
import TrackContainer from "./TrackContainer";

const TrackStation = ({ projectTracks }) => {
  return (
    <div id="track-station-container">
      <TrackControls />
      <div id="tracks-and-stems">
        {projectTracks?.map((track, index) => (
          <TrackContainer key={index} track={track} />
        ))}
        <div style={{height: "200px"}}>Bottom</div>
      </div>
    </div>
  )
}

export default TrackStation