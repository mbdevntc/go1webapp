import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight, arrowLeftDown, arrowLeftUp, arrowRightUp, arrowRightDown } from "../utils/icons.js"
import { Title } from "./Title.js"
import { useSelector } from "react-redux"
import { selectCurrentMode, selectIsConnected, selectLRSpeed, selectSpeed, selectTurningSpeed } from "../features/RobotSlice.js"
import { useRef } from "react"

// Le parti di codice commentate sono necessarie per poter utilizzare il Joystick
export const MovementController = () => {
    const isConnected = useSelector(selectIsConnected)
    const currentMode = useSelector(selectCurrentMode)
    const speed = useSelector(selectSpeed)                  // Velocità di avanzamento
    const lrSpeed = useSelector(selectLRSpeed)              // Velocità SX/DX
    const turningSpeed = useSelector(selectTurningSpeed)    // Velocità rotazione SX/DX
    
    let intervalID = useRef()

    
    // const leftAnalogAxes = useSelector(selectGamepadLeftAnalogAxes)
    // useEffect(() => {
    //     if(isConnected&& currentMode === "walk") {
    //         const fb = parseFloat(leftAnalogAxes[1])
    //         const lr = parseFloat(leftAnalogAxes[0])
    //         if(Math.abs(fb) > 0.1 || Math.abs(lr) > 0.1) {
    //             move(0, lr, fb, 100)
    //         } else {
    //             move(0, 0, 0, 100)
    //         }
    //     }
    // })

    // Invio dei dati relativi al movimento che deve eseguire il cane al server
    const move = async (leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time) => {
        // Verifica della connessione con il cane robot e che la modalità si impostata su cammminata
        if(isConnected && currentMode === "walk") {
            // Formattazione dei dati in JSON
            const data = JSON.stringify({ leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time })
            try {
                // Invio dei dati e attesa della risposta del server
                const res = await fetch("http://localhost:4001/move", {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: data
                })
                return res
            } catch(e) {
                console.log(e)
            }
        }
    }
    
    // Funzione per inviare ad intervalli regolari le informazioni di movimento 
    // se il pulsante viene mantenuto premuto
    const continueMove = cb => {
        // Esecuzione della funzione per ridurre il tempo di esecuzione della stessa,
        // dato che setInterval esegue il primo ciclo dopo il tempo indicato (275ms)
        cb()
        intervalID.current = setInterval(cb, 275)
    }
    
    // Funzione che termina l'esecuzione del setInterval associato all'ID, in modo da non
    // creare intervalli che si sovrappongono e continuare ad eseguire all'infinito il codice
    // in essi presenti
    const stop = () => {
        move(0, 0, 0, 100) // blocco di emergenza :)
        clearInterval(intervalID.current)
    }

    return (
        <div className="controller-block">
            <Title title={"Movimento"} />
            <div className="controller">
                {/* Pulsante avanti sinistra */}
                <ControllerBtn
                    icon={arrowLeftUp}
                    onMouseDown={() => continueMove(() => move(0, -turningSpeed, speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                    />

                {/* Pulsante avanti */}
                <ControllerBtn
                    icon={arrowUp}
                    onMouseDown={() => continueMove(() =>  move(0, 0, speed, 250))}
                    onMouseUp={stop}
                />

                {/* Pulsante avanti destra */}
                <ControllerBtn
                    icon={arrowRightUp}
                    onMouseDown={() => continueMove(() => move(0, turningSpeed, speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />

                {/* Pulsante sinistra */}
                <ControllerBtn
                    icon={arrowLeft}
                    onMouseDown={() => continueMove(() => move(-lrSpeed, 0, 0, 250))}
                    onMouseUp={stop}
                />

                {/* Pulsante stop */}
                <ControllerBtn
                    icon={"STOP"}
                    className="alert"
                    onMouseDown={stop}
                    onMouseUp={stop}
                />

                {/* Pulsante destra */}
                <ControllerBtn
                    icon={arrowRight}
                    onMouseDown={() => continueMove(() => move(lrSpeed, 0, 0, 250))}
                    onMouseUp={stop}
                />

                {/* Pulsante inidietro sinistra */}
                <ControllerBtn
                    icon={arrowLeftDown}
                    onMouseDown={() => continueMove(() => move(0, -turningSpeed, -speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />

                {/* Pulsante indietro */}
                <ControllerBtn
                    icon={arrowDown}
                    onMouseDown={() => continueMove(() => move(0, 0, -speed, 250))}
                    onMouseUp={stop}
                 />

                {/* Pulsante indietro destra */}
                <ControllerBtn
                    icon={arrowRightDown}
                    onMouseDown={() => continueMove(() => move(0, turningSpeed, -speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />

                {/* Pulsante sinistra */}
                <ControllerBtn
                    icon={arrowLeft}
                    onMouseDown={() => continueMove(() => move(0, -turningSpeed, 0, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                    />

                <div className="blank"></div>

                {/* Pulsante destra */}
                <ControllerBtn
                    icon={arrowRight}
                    onMouseDown={() => continueMove(() => move(0, turningSpeed, 0, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />
            </div>
        </div>
    )
}