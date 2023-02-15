import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Controllers } from './components/Controllers.js';
import { NavBar } from './components/NavBar.js';
import { isConnected, selectIsConnected, setInteractionMsg } from './features/RobotSlice.js';
import { Modes } from './components/Modes.js';

import './App.css';
import { MessagesStack } from './components/MessagesStack.js';
import { Gamepad } from './components/Gamepad.js';
import { Microphone } from './components/Microphone.js';

// Per poter utilizzare il Joystick scommentare il componente Gamepad e le 
// parti di codice presenti nei componenti MovementController e InclinationController
// e importare le funzioni necessarie :)
function App() {
  const dispatch = useDispatch()
  const isConnect = useSelector(selectIsConnected)

  // Verifica ogni secondo se il server è connesso al cane
  useEffect(() => {
      const intervalID = setInterval(async () => {
        dispatch(isConnected())
    }, 1000)
    return () => clearInterval(intervalID)
  })
  const startChoreography = async () => {
    if(isConnect) {
      try {
        await fetch("http://localhost:5000/startChoreography", {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      dispatch(setInteractionMsg({
        msg: "Cane robot non connesso",
        mode: "",
        expiringIn: 5
    }))
    }
  }
  
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        <div className="main-modes">
          <Modes />
          <Microphone />
          {window.navigator.userAgentData.platform === "Linux" && <div className="btn-choreo" onClick={startChoreography}>Start Choreography</div>}
        </div>
        <Controllers />
        <div className={`info ${isConnect ? "green" : "red"}`}>
          {isConnect ? "Robot connesso" : "Robot non connesso"}
        </div>
        <Gamepad />
        <MessagesStack />
      </div>
    </div>
  );
}
export default App;