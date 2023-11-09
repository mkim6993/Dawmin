import "../../../styles/TrackControls.css";
import TrackControlAdd from "./TrackControlAdd";
import TrackControlTime from "./TrackControlTime";

const TrackControls = () => {
	return (
		<div id="track-controls-container">
			<TrackControlAdd />
			<div>
				<TrackControlTime />
			</div>
		</div>
	)
};

export default TrackControls;