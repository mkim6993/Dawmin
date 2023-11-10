import "../../../styles/TrackControlAdd.css";
import { IoAdd } from "react-icons/io5";


const TrackControlAdd = ({ createNewTrack }) => {
    function addNewTrack() {
        createNewTrack();
    }

    return (
        <div id="track-control-add-container">
            <div id="add-track-button" onClick={() => addNewTrack()}>
                <IoAdd size={"24px"} color={"rgb(240, 240, 240)"} />
            </div>
        </div>
    )
};

export default TrackControlAdd;