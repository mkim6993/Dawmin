import "../../../styles/TrackVolumeSlider.css";

const TrackVolumeSlider = ({ changeTrackVolume, trackID }) => {
    /**
     * Currently utilized to show and hide the volume value on drag
     */

    return (
        <div className="track-slider-container">
            <input 
                type="range"
                min={-100}
                max={100}
                step={.1}
                className="track-slider-appearance"
                onChange={event => {
                    changeTrackVolume(trackID, event.target.valueAsNumber)
                }}
            />
        </div>
    )
};

export default TrackVolumeSlider;