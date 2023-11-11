import { useClickAway } from "@uidotdev/usehooks";
import "../../../styles/TrackStationContextMenu.css";

const TrackStationContextMenu = ({ trackID, x, y, closeMenu, deleteTrack }) => {
    const ref = useClickAway(() => {
        closeMenu();
    });

    function handleDeleteTrack() {
        deleteTrack(trackID);
    }

    return (
        <div 
            ref={ref}
            onClick={() => closeMenu()}
            id="track-station-context-menu-container"
            style={{top: `${y}px`, left: `${x}px`, position: "absolute"}}
        >
            <div className="c-menu-item">New Audio Track</div>
            <div className="c-menu-item">Rename Track</div>
            <div className="c-menu-item" onClick={() => handleDeleteTrack()}>Delete Track</div>
        </div>
    )
};

export default TrackStationContextMenu;