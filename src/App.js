// import { Go1 } from '@droneblocks/go1-js';
import { ManualCommands } from './components/ManualCommands';
import { NavBar } from './components/NavBar';

import './App.css';
// const robot = new Go1()
// 



function App() {

  let robot = {
    goForward: () => console.log("Sto avanzando"),
    goBackward: () => console.log("Sto retreggiando"),
    goRight: () => console.log("Sto andando a destra"),
    goLeft: () => console.log("Sto andando a sinistra"),
    inclineUp: () => console.log("Inclinato verso l'alto"),
    inclineDown: () => console.log("Inclinato verso il basso"),
  }
  
  return (
    <div className="App">
      <NavBar />
      <ManualCommands robot={robot} />
    </div>
  );
}

export default App;
