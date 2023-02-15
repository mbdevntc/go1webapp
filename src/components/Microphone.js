import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFinalResult, selectIntermediateResult, selectIsFinal, selectOutputResult, setOutputResult } from "../features/MicrophoneSlice.js"
import { changeMode, selectIsConnected, selectLRSpeed, selectSpeed, selectTurningSpeed, setInteractionMsg } from "../features/RobotSlice.js"
import { useOfflineRecognition } from "../hooks/useOfflineRecognition.js"
// import { useRecognition } from "../hooks/useRecognition.js"
import { getCommand, inclineAPI, moveAPI } from "./utils.js"
import { disabledMic, mic } from "../utils/icons.js"
import "./style/Microphone.css"

export const Microphone = () => {
    const dispatch = useDispatch()
    const intermediateResult = useSelector(selectIntermediateResult)
    const finalResult = useSelector(selectFinalResult)
    const isFinal = useSelector(selectIsFinal)
    const outputResult = useSelector(selectOutputResult)

    // const { onAir, setOnAir } = useRecognition()
    const { onAir, setOnAir } = useOfflineRecognition()
    
    const isConnected = useSelector(selectIsConnected)
    
    const speed = useSelector(selectSpeed)                  // Velocità di avanzamento
    const lrSpeed = useSelector(selectLRSpeed)              // Velocità SX/DX
    const turningSpeed = useSelector(selectTurningSpeed)    // Velocità rotazione SX/DX

    // Invio dei dati relativi al movimento che deve eseguire il cane al server
    const move = async (leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time) => {
        // Verifica della connessione con il cane robot
        if(isConnected) {
            await moveAPI(leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time)
        } else  {
            dispatch(setInteractionMsg({
                msg: "Cane robot non connesso",
                mode: "",
                expiringIn: 5
            }))
        }
    }

    // Invio dei dati relativi al movimento che deve eseguire il cane al server
    const incline = async (leanLR, twistLR, lookUpDown, time) => {
        // Verifica della connessione con il cane robot
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

    // Funzione per inviare al server la modalità che il cane robot dovrà assumere
    const changeRobotMode = async (mode) => {
        if(isConnected) {
            const data = JSON.stringify({ mode })
            try {
                const res = await fetch("http://localhost:4001/mode", {
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
    
    useEffect(() => {
        if(isFinal) {
            const toDo = getCommand(finalResult)
            dispatch(setOutputResult(toDo[0]))
            if(toDo[1] === "move") {
                changeRobotMode("walk")
                dispatch(changeMode("walk"))
                move(lrSpeed * toDo[2], turningSpeed * toDo[3], speed * toDo[4], 250, "move")
            } else if (toDo[1] === "incline") {
                changeRobotMode("stand")
                dispatch(changeMode("stand"))
                incline(toDo[2], toDo[3], toDo[4], 500, "incline")
            } else if(toDo[1] === "mode") {
                changeRobotMode(toDo[2])
                dispatch(changeMode(toDo[2]))
            }
        }
    }, [isFinal])

    return (
        <div className="microphone">
            <div className={`mic-button ${onAir ? "recording" : ""}`} onClick={() => setOnAir(prev => !prev)}>{onAir ? mic : disabledMic}</div>
            <div className="mic-input">{isFinal ? finalResult : intermediateResult}</div>
            <div className="mic-out-result" data-text={outputResult}>{outputResult}</div>
        </div>
    )
}