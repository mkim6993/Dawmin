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
                value={1}
                id={`track-volume${id}`}
                onChange={event => {
                    console.log(event.target.valueAsNumber + `track-slider-appearance + ${id}`)
                }}
            />
        </div>
    )
}

export default TrackVolumeSlider;