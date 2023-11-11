import "../../../styles/TrackProfile.css";
import TrackVolumeSlider from "./TrackVolumeSlider";
import { IoHeadset, IoVolumeMute } from "react-icons/io5";
import { useState } from "react";
import TrackStationContextMenu from "./TrackStationContextMenu";

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  };

const TrackProfile = ({ 
    track, 
    toggleTrackMute, 
    toggleTrackIsolation,
    changeTrackVolume,
    deleteTrack,
}) => {

    function toggleMute() {
        toggleTrackMute(track.id);
    }

    function toggleIsolation() {
        toggleTrackIsolation(track.id);
    }

    const [contextMenu, setContextMenu] = useState(initialContextMenu);

    function handleContextMenu(event) {
      console.log("handlecontextmenu")
      event.preventDefault();
      const { pageX, pageY } = event;
      setContextMenu({ show: true, x: pageX, y: pageY });
    }
  
    function closeContextMenu() {
      setContextMenu(initialContextMenu);
    }

    return (
        <div className="track-profile-container" onContextMenu={(event) => handleContextMenu(event)}>
            {contextMenu.show && <TrackStationContextMenu trackID={track.id} x={contextMenu.x} y={contextMenu.y} closeMenu={closeContextMenu} deleteTrack={deleteTrack}/>}
            <div>
                <div className="track-profile-name">
                    {track.name}
                </div>
                <div className="single-track-controls-container">
                    <div className="single-track-sound-control">
                        <div className="track-mute-button" onClick={() => toggleMute()}>
                            {track.muted ? (
                                <div className="track-mute-inner flex-center-center track-mute-on">
                                    <IoVolumeMute size={"15px"} color="rgb(229, 229, 229)" />
                                </div>
                            ) : (
                                <div className="track-mute-inner flex-center-center">
                                    <IoVolumeMute size={"15px"} color="rgb(229, 229, 229)" />
                                </div>
                            )}
                        </div>
                        <div className="track-sound-only-button" onClick={() => toggleIsolation()}>
                            {track.isolated ? (
                                <div className="track-sound-only-inner flex-center-center track-sound-only-on">
                                    <IoHeadset size={"15px"} color="rgb(229, 229, 229)" />
                                </div>
                            ) : (
                                <div className="track-sound-only-inner flex-center-center">
                                    <IoHeadset size={"15px"} color="rgb(229, 229, 229)" />
                                </div>
                            )}
                        </div>
                    </div>
                    <TrackVolumeSlider changeTrackVolume={changeTrackVolume} trackID={track.id}/>
                </div>
            </div>
     	</div>
	)
};

export default TrackProfile;