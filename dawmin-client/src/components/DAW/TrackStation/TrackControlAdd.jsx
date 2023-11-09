import "../../../styles/TrackControlAdd.css";
import { IoAdd } from "react-icons/io5";


const TrackControlAdd = () => {
    return (
        <div id="track-control-add-container">
            <div id="add-track-button">
                <IoAdd size={"24px"} color={"gb(188, 188, 188)"} />
            </div>
        </div>
    )
};

export default TrackControlAdd;