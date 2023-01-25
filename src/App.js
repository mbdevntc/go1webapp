import { ManualCommands } from './components/ManualCommands.js';
import { NavBar } from './components/NavBar.js';

import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isConnected, selectIsConnected } from './features/RobotSlice.js';
import { Modes } from './components/Modes.js';

function App() {
  const dispatch = useDispatch()
  const connected = useSelector(selectIsConnected)

  useEffect(() => {
      const intervalID = setInterval(async () => {
        // console.log("Test connessione")
        dispatch(isConnected())
    }, 1000)
    return () => clearInterval(intervalID)
  })
  
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        <Modes />
        <ManualCommands />
        <div className={`info ${connected ? "green" : "red"}`}>
          {connected ? "Robot connesso" : "Robot non connesso"}
        </div>
      </div>
    </div>
  );
}

export default App;

/* 
    Possibili comandi:
      * goForward
      * goBackward
      * goLeft
      * goRight
      * go
      * turnLeft
      * turnRight
      * extendUp
      * squatDown
      * leanLeft
      * leanRight
      * twistLeft
      * twistRight
      * lookDown
      * lookUp
      * wait
    Modalità cane:
      * dance1
      * dance2
      * straightHand1
      * damping
      * standUp
      * standDown
      * recoverStand
      * stand
      * walk
      * run
      * climb
  */