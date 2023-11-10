import "../../../styles/TrackProfile.css";
import TrackVolumeSlider from "./TrackVolumeSlider";
import { IoHeadset, IoVolumeMute } from "react-icons/io5";

const TrackProfile = ({ 
    track, 
    toggleTrackMute, 
    toggleTrackIsolation 
}) => {

    function toggleMute() {
        toggleTrackMute(track.id);
    }

    function toggleIsolation() {
        toggleTrackIsolation(track.id);
    }

    return (
        <div className="track-profile-container">
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
                    <TrackVolumeSlider />
                </div>
            </div>
     	</div>
	)
};

export default TrackProfile;