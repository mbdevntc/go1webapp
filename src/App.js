import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ManualCommands } from './components/ManualCommands.js';
import { NavBar } from './components/NavBar.js';
import { isConnected, selectIsConnected } from './features/RobotSlice.js';
import { Modes } from './components/Modes.js';

import './App.css';
// import { useGamepad } from './hooks/useGamepad.js';
import { Gamepad } from './components/Gamepad.js';

function App() {
  const dispatch = useDispatch()
  const connected = useSelector(selectIsConnected)

  // useGamepad()

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
        <Gamepad />
      </div>
    </div>
  );
}
export default App;