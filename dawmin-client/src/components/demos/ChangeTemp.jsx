import WAAClock from "waaclock";
import { useEffect, useRef } from "react";

const ChangeTemp = () => {
    const clock = useRef();
    const audioContext = useRef();

    useEffect(() => {
        audioContext.current = new AudioContext();
        clock.current = new WAAClock(audioContext.current);
        clock.current.start();

        var event = clock.current.callbackAtTime(function() {
            console.log('wow')
        }, 3);

        var event2 = clock.current.setTimeout(() => {
            console.log('wowza')
        }, 3);
    }, []);

    return (
        <div>ChangeTemp</div>
    )
};

export default ChangeTemp;