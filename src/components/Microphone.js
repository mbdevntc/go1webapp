import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFinalResult, selectIntermediateResult, selectIsFinal, selectOutputResult, selectRecordingStatus, setOutputResult, toggleRecording } from "../features/MicrophoneSlice.js"
import { changeMode, selectIsConnected, selectLRSpeed, selectSpeed, selectTurningSpeed, setInteractionMsg } from "../features/RobotSlice.js"
import { useRecognition } from "../hooks/useRecognition.js"
import { disabledMic, mic } from "../utils/icons.js"
import "./style/Microphone.css"
import { getCommand } from "./utils.js"

export const Microphone = () => {
    const dispatch = useDispatch()
    const recording = useSelector(selectRecordingStatus)
    const intermediateResult = useSelector(selectIntermediateResult)
    const finalResult = useSelector(selectFinalResult)
    const isFinal = useSelector(selectIsFinal)
    const outputResult = useSelector(selectOutputResult)
    
    const isConnected = useSelector(selectIsConnected)
    
    const speed = useSelector(selectSpeed)                  // Velocità di avanzamento
    const lrSpeed = useSelector(selectLRSpeed)              // Velocità SX/DX
    const turningSpeed = useSelector(selectTurningSpeed)    // Velocità rotazione SX/DX

    // Invio dei dati relativi al movimento che deve eseguire il cane al server
    const command = async (leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time, action) => {
        // Verifica della connessione con il cane robot
        if(isConnected) {
            // Formattazione dei dati in JSON
            const data = JSON.stringify({ leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time })
            try {
                // Invio dei dati e attesa della risposta del server
                const res = await fetch(`http://localhost:4001/${action}`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: data
                })
                return res
            } catch(e) {
                console.log(e)
            }
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
    
    const handleToggleRecording = () => {
        dispatch(toggleRecording())
    }
    
    useRecognition()
    
    useEffect(() => {
        if(isFinal) {
            const toDo = getCommand(finalResult)
            dispatch(setOutputResult(toDo[0]))
            if(toDo[1] === "move") {
                changeRobotMode("walk")
                dispatch(changeMode("walk"))
                command(lrSpeed * toDo[2], turningSpeed * toDo[3], speed * toDo[4], 500, "move")
            } else if (toDo[1] === "incline") {
                changeRobotMode("stand")
                dispatch(changeMode("stand"))
                command(toDo[2], toDo[3], toDo[4], 500, "incline")
            } else if(toDo[1] === "mode") {
                changeRobotMode(toDo[2])
                dispatch(changeMode(toDo[2]))
            }
        }
    }, [isFinal])

    return (
        <div className="microphone">
            <div className={`mic-button ${recording ? "recording" : ""}`} onClick={handleToggleRecording}>{recording ? mic : disabledMic}</div>
            <div className="mic-input">{isFinal ? finalResult : intermediateResult}</div>
            <div className="mic-out-result" data-text={outputResult}>{outputResult}</div>
        </div>
    )
}