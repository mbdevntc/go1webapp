import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight } from "../utils/icons.js"
import { Title } from "./Title.js"
import { useRef } from "react"
import { selectCurrentMode, selectIsConnected } from "../features/RobotSlice.js"
import { useSelector } from "react-redux"

// Le parti di codice commentate sono necessarie per poter utilizzare il Joystick
export const InclinationController = () => {
    let intervalID = useRef()
    const isConnected = useSelector(selectIsConnected)
    const currentMode = useSelector(selectCurrentMode)
    
    // const rightAnalogAxes = useSelector(selectGamepadRightAnalogAxes)
    // useEffect(() => {
    //     if(isConnected && currentMode === "stand") {
    //         const lookUpDown = parseFloat(rightAnalogAxes[1])
    //         const leanLR = parseFloat(rightAnalogAxes[0])
    //         if(Math.abs(lookUpDown) > 0.1 || Math.abs(leanLR) > 0.1) {
    //             incline(leanLR, lookUpDown, 100)
    //         } else {
    //             incline(0, 0, 0, 100)
    //         }
    //     }
    // })

    // Invio dei dati relativi all'inclinazione del cane al server
    const incline = async (leanLR, twistLR, lookUpDown, time) => {
        // Verifica della connessione con il cane robot e che la modalità si impostata su posizione statica
        if(isConnected && currentMode === "stand") {
            // Formattazione dei dati in JSON
            const data = JSON.stringify({ leanLR, twistLR, lookUpDown, time })
            try {
                // Invio dei dati e attesa della risposta del server
                const res = await fetch("http://localhost:4001/incline", {
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

    // Funzione per inviare ad intervalli regolari le informazioni di inclinazione 
    // se il pulsante viene mantenuto premuto
    const continueMove = cb => {
        cb()
        intervalID.current = setInterval(() => cb(), 275)
    }

    // Funzione eseguita al rilascio del pulsante
    const stop = () => clearInterval(intervalID.current)

    return (
        <div className="controller-block">
            <Title title={"Inclinazione"}></Title>
            <div className="controller">
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowUp}
                    onMouseDown={() => continueMove(() => incline(0, 0, -1, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowLeft}
                    onMouseDown={() => continueMove(() => incline(-1, 0, 0, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowRight}
                    onMouseDown={() => continueMove(() => incline(1, 0, 0, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowDown}
                    onMouseDown={() => continueMove(() => incline(0, 0, 1, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
            </div>
        </div>

    )
}