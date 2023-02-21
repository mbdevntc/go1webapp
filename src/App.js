import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Controllers } from './components/Controllers.js';
import { NavBar } from './components/NavBar.js';
import { isConnected, selectIsConnected, setInteractionMsg } from './features/RobotSlice.js';
import { Modes } from './components/Modes.js';

import { MessagesStack } from './components/MessagesStack.js';
import { Gamepad } from './components/Gamepad.js';
import { selectIsGamepadConnected } from './features/GamepadSlice.js';
import { Microphone } from './components/Microphone.js';

import './App.css';

// Per poter utilizzare il Joystick scommentare il componente Gamepad e le 
// parti di codice presenti nei componenti MovementController e InclinationController
// e importare le funzioni necessarie :)
function App() {
  const dispatch = useDispatch()
  const isConnect = useSelector(selectIsConnected)
  const isGamepadConnected = useSelector(selectIsGamepadConnected)

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

  const stopChoreography = async () => {
    if(isConnect) {
      try {
        await fetch("http://localhost:5000/stopChoreography", {
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
          <div className='inline-btns'>
            {window.navigator.userAgentData.platform === "Linux" && <div className="btn btn-rainbow cl-white" onClick={startChoreography}>Start Choreography</div>}
            {window.navigator.userAgentData.platform === "Linux" && <div className="btn bg-alert cl-white" onClick={stopChoreography}>Stop Choreography</div>}
          </div>
        </div>
        <Controllers />
        <div className='inline-btns'>
          <div className={`info ${isConnect ? "green" : "red"}`}>
            {isConnect ? "Robot connesso" : "Robot non connesso"}
          </div>
          <div className={`info ${isGamepadConnected ? "green" : "red"}`}>
            {isGamepadConnected ? "Gamepad connesso" : "Gamepad non connesso"}
          </div>
        </div>
        
        <Gamepad />
        <MessagesStack />
      </div>
    </div>
  );
}
export default App;