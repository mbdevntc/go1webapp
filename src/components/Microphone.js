import { useDispatch, useSelector } from "react-redux"
import { selectIntermediateResult, selectRecordingStatus, toggleRecording } from "../features/MicrophoneSlice.js"
import { useRecognition } from "../hooks/useRecognition.js"
import { disabledMic, mic } from "../utils/icons.js"
import "./style/Microphone.css"

export const Microphone = () => {
    const dispatch = useDispatch()
    const recording = useSelector(selectRecordingStatus)
    const intermediateResult = useSelector(selectIntermediateResult)

    const handleToggleRecording = () => {
        dispatch(toggleRecording())
    } 

    useRecognition()

    return (
        <div className="microphone">
            <div className={`mic-button ${recording ? "recording" : ""}`} onClick={handleToggleRecording}>{recording ? mic : disabledMic}</div>
            <div className="mic-input">{intermediateResult}</div>
        </div>
    )
}