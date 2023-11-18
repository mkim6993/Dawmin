import './App.css'
import WorkStation from './components/DAW/WorkStation/WorkStation';
import { handleRightClick } from "./assets/js/AppUtility";
// import Oscilator from './components/demos/Oscilator';
// import VoiceRecorder from './components/demos/VoiceRecorder';

function App() {
  document.addEventListener("contextmenu", handleRightClick);
  console.log("app mounted")
  
  return (
    <>
      <WorkStation />
    </>
  )
}

export default App;
