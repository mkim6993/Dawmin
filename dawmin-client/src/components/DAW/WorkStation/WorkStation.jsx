import "../../../styles/WorkStation.css";
import { useState, useEffect } from "react";
import MasterControls from "./MasterControls";
import TrackStation from "../TrackStation/TrackStation";

const Tracks = {
  projectID: "1",
  trackCount: 0,
  projectTracks: {
    // "1": {
    //   id: "1",
    //   name: "Audio 1",
    //   muted: false,
    //   isolated: false,
    //   volume: 0
    // },
    // "2": {
    //   id: "2", 
    //   name: "Audio 2",
    //   muted: true,
    //   isolated: true,
    //   volume: 0
    // }
  }
};

const WorkStation = () => {
  console.log("work station component rerendered");
  /**
   * Master Control States
   * - play/pause
   * - volume
   * - recording
   */
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.0);
  const [isRecording, setIsRecording] = useState(false);

  /**
   * Project Track states
   */
  const [projectTracks, setProjectTracks] = useState(null);
  const [trackCount, setTrackCount] = useState(0);

  function generateUniqueID() {
    return Math.random().toString(36).slice(2, 9);
  }

  /**
   * Master Control Methods
   * - play/pause
   * - volume
   * - recording
   */
  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  function onChangeMasterVolume(value) {
    setMasterVolume(value);
  }

  function startRecording() {
    setIsRecording(true);
  }

  function stopRecording() {
    setIsRecording(false);
  }

  /**
   * Project Tracks manipulation
   */
  function printTracks() {
    console.log(projectTracks);
  }

  function createNewTrack() {
    let newTrackID = generateUniqueID();
    let newTrackCount = trackCount + 1;
    const newTrack = {
      id: newTrackID,
      name: "Audio " + newTrackCount.toString(),
      muted: false,
      isolated: false,
      volume: 0
    }
    setProjectTracks(prevTracks => ({
      ...prevTracks,
      [newTrackID]: newTrack
    }));
    setTrackCount(newTrackCount);
  }

  function toggleTrackMute(trackID) {
    if (projectTracks && projectTracks[trackID]) {
      const updatedTracks = {
        ...projectTracks,
        [trackID]: {
          ...projectTracks[trackID],
          muted: !projectTracks[trackID].muted,
        },
      };

      setProjectTracks(updatedTracks);
    }
  }

  function toggleTrackIsolation(trackID) {
    if (projectTracks && projectTracks[trackID]) {
      const updatedTracks = {
        ...projectTracks,
        [trackID]: {
          ...projectTracks[trackID],
          isolated: !projectTracks[trackID].isolated,
        },
      };

      setProjectTracks(updatedTracks);
    }
  }

  useEffect(() => {
    console.log("useeffect in workstation");
    setProjectTracks(Tracks.projectTracks);
    setTrackCount(Tracks.trackCount);
  }, []);
  
  return (
    <div id="work-station-container">
      <button onClick={() => printTracks()} id="print-tracks">print tracks</button>
      <MasterControls 
        isPlaying={isPlaying} 
        togglePlayPause={togglePlayPause} 
        masterVolume={masterVolume} 
        onChangeMasterVolume={onChangeMasterVolume}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      <TrackStation 
        projectTracks={projectTracks} 
        createNewTrack={createNewTrack}
        toggleTrackMute={toggleTrackMute}
        toggleTrackIsolation={toggleTrackIsolation}
      />
    </div>
  )
};

export default WorkStation;