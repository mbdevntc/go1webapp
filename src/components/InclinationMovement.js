import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight } from "../utils/icons.js"
import { Title } from "./Title.js"
import { selectCurrentMode, selectCurrentModeUser, selectIsConnected, setInteractionMsg } from "../features/RobotSlice.js"
import { inclineAPI } from "./utils.js"

// Le parti di codice commentate sono necessarie per poter utilizzare il Joystick
export const InclinationController = () => {
    const dispatch = useDispatch()
    let intervalID = useRef()
    const isConnected = useSelector(selectIsConnected)
    const currentMode = useSelector(selectCurrentMode)
    const currentModeUser = useSelector(selectCurrentModeUser)

    // Joystick handler
    
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
        if(isConnected) {
            await inclineAPI(leanLR, twistLR, lookUpDown, time)
        } else  {
            dispatch(setInteractionMsg({
                msg: "Cane robot non connesso",
                mode: "",
                expiringIn: 5
            }))
        }
    }

    // Funzione per inviare ad intervalli regolari le informazioni di inclinazione 
    // se il pulsante viene mantenuto premuto
    const continueMove = cb => {
        // Verifica della modalità del cane. Nel caso non sia in modalità camminata, suggerisce
        // all'utente di cambiare modalità, mediante un popup
        if(currentMode === "stand") {
            // Esecuzione della funzione per ridurre il tempo di esecuzione della stessa,
            // dato che setInterval esegue il primo ciclo dopo il tempo indicato (275ms)
            cb()
            intervalID.current = setInterval(cb, 275)
        } else  {
            dispatch(setInteractionMsg({
                msg: `Robot in modalità ${currentModeUser}. Passare in modalità Stand?`,
                mode: "stand"
            }))
        }
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