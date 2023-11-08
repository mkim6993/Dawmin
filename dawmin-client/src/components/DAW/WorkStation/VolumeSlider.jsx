import "../../../styles/VolumeSlider.css";
import { useEffect } from "react";

const VolumeSlider = ({ masterVolume, onChangeMasterVolume }) => {

    /**
     * Currently utilized to show and hide the volume value on drag
     */
    useEffect(() => {
        const volumeSlider = document.getElementById("slider-appearance");
        const volumeValue = document.getElementById("volume-value-display");
        console.log("useEffect in volumeslider");

        const handleMouseDown = () => {
            console.log("mousedown")
            volumeValue.style.display = "block";
        }

        const handleMouseUp = () => {
            console.log("mouseup")
            volumeValue.style.display = "none";
        }


        volumeSlider.addEventListener("mousedown", handleMouseDown);
    
        volumeSlider.addEventListener("mouseup", handleMouseUp);

        return () => {
            volumeSlider.removeEventListener("mousedown", handleMouseDown);
            volumeSlider.removeEventListener("mouseup", handleMouseUp);
        }
    });

    return (
        <div id="slider-container">
            <input 
                type="range"
                min={-80.0}
                max={6}
                step={.1}
                value={masterVolume}
                onChange={event => {
                    onChangeMasterVolume(event.target.valueAsNumber)
                }}
                id="slider-appearance"
            />
            <p id="volume-value-display">{masterVolume > -0.1 ? "+" + masterVolume + "dB" : masterVolume + "dB"}</p>
        </div>
    )
}

export default VolumeSlider;