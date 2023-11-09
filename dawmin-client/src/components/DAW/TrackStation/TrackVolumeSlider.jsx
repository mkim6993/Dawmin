import "../../../styles/TrackVolumeSlider.css";

const TrackVolumeSlider = () => {
    const id = "2";

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
                id={`slider-appearance + ${id}`}
                className="track-slider-appearance"
            />
        </div>
    )
}

export default TrackVolumeSlider;