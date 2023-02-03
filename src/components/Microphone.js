import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFinalResult, selectIntermediateResult, selectIsFinal, selectRecordingStatus, toggleRecording } from "../features/MicrophoneSlice.js"
import { useRecognition } from "../hooks/useRecognition.js"
import { disabledMic, mic } from "../utils/icons.js"
import "./style/Microphone.css"

export const Microphone = () => {
    const dispatch = useDispatch()
    const recording = useSelector(selectRecordingStatus)
    const intermediateResult = useSelector(selectIntermediateResult)
    const finalResult = useSelector(selectFinalResult)
    const isFinal = useSelector(selectIsFinal)
    

    // Da migliorare il codice
    const keywords = {
        sit: ["siediti", "seduto", "sentete", "sentate"],
        up: ["alzati", "su", "alsate", "levete"],
        forward: ["avanti", "avanza", "vanti"],
        backward: ["indietro", "indietreggia", "indrio"],
        left: ["sinistra"],
        right: ["destra"]
    }
    
    const areIncluded = (arrayOfWords, wordsToSearch) => {
        let result = false
        for(let word of wordsToSearch) {
            if(arrayOfWords.includes(word)) {
                result = true
                break
            }
        }
        return result
    }
    
    const lowerize = string => {
        return string.toLowerCase().split(" ")
    }
    
    const handleToggleRecording = () => {
        dispatch(toggleRecording())
    }
    
    useRecognition()
    
    useEffect(() => {
        if(isFinal) {
            const transcriptLower = lowerize(finalResult)
            console.log(transcriptLower)
            if (areIncluded(transcriptLower, ["piper","cane","oreo"])) {
                console.log("keyword found, searching for commands...")
                for (const keyword in keywords) {
                    if (areIncluded(transcriptLower, keywords[keyword])) {
                        console.log(`Il cane ${keyword}`)
                        // qui inserire i comandi da inviare al cane
                        break
                    }
                }
            }
        }
    }, [isFinal])

    return (
        <div className="microphone">
            <div className={`mic-button ${recording ? "recording" : ""}`} onClick={handleToggleRecording}>{recording ? mic : disabledMic}</div>
            <div className="mic-input">{isFinal ? finalResult : intermediateResult}</div>
        </div>
    )
}