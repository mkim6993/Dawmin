import "../../../styles/TrackControls.css";
import TrackControlAdd from "./TrackControlAdd";
import TrackControlTime from "./TrackControlTime";

const TrackControls = ({ createNewTrack }) => {
	return (
		<div id="track-controls-container">
			<TrackControlAdd createNewTrack={createNewTrack}/>
			<div>
				<TrackControlTime />
			</div>
		</div>
	)
};

export default TrackControls;