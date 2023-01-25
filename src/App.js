import { ManualCommands } from './components/ManualCommands.js';
import { NavBar } from './components/NavBar.js';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [ connected, setConnected ] = useState(false)

  const isConnected = async () => {
    try {
        const res = await fetch("http://localhost:4001/isConnected")
        const json = await res.json()
        return json
      } catch(e) {
        console.log(e)
      }
    }
    
    useEffect(() => {
      const intervalID = setInterval(async () => {
        const connection = await isConnected()
        setConnected(connection.connected)
    }, 1000)
    return () => clearInterval(intervalID)
  })
  
  return (
    <div className="App">
      <NavBar />
      <div className="main">
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