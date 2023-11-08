import "../../../styles/WorkStation.css";
import MasterControls from "./MasterControls";
import TrackStation from "../TrackStation/TrackStation";

const WorkStation = () => {
  return (
    <div id="work-station-container">
      <MasterControls/>
      <TrackStation />
    </div>
  )
}

export default WorkStation