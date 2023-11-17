import { useState, useEffect, useRef } from "react";

const Osc1 = ({changeFreq, freq}) => {
  return (
    <div>
        <input onChange={changeFreq} value={freq} max="5000" type="range" id="frequency" />
    </div>
  )
}

let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);

const Oscilator = () => {
    const [osc1Freq, setOsc1Freq] = useState(osc1.frequency.value);

    const changeOsc1Freq = e => {
        let {value} = e.target;
        setOsc1Freq(value);
        osc1.frequency.value = value;
    };

    
    return (
        <div>
            <h1>Javascript Audio</h1>
            <button onClick={() => osc1.start()}>start</button>
            <button onClick={() => osc1.stop()}>stop</button>
            <Osc1 changeFreq={changeOsc1Freq} freq={osc1Freq}/>
        </div>
    )
};

export default Oscilator;