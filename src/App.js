import { ManualCommands } from './components/ManualCommands.js';
import { NavBar } from './components/NavBar.js';

import './App.css';

function App() {

  
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
      * standUp,
      * standDown
      * recoverStand
      * stand
      * walk
      * run
      * climb
  */
  
  return (
    <div className="App">
      <NavBar />
      <ManualCommands />
    </div>
  );
}

export default App;
