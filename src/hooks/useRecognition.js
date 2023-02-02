import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectRecordingStatus, setFinalResult, setIntermediateResult } from "../features/MicrophoneSlice.js"

export const useRecognition = () => {
    const dispatch = useDispatch()
    const onAir = useSelector(selectRecordingStatus)
    const recognition = useRef(window.SpeechRecognition || new window.webkitSpeechRecognition())

    const lowerize = string => {
        return string.toLowerCase().split(" ")
    }

    const handleResult = e => {
        const transcript = e.results[e.results.length - 1][0].transcript
        console.log(transcript)
        if(e.results.isFinal) {
            dispatch(setFinalResult(transcript))
        } else {
            dispatch(setIntermediateResult(transcript))
        }
    }

    useEffect(() => {
        const r = recognition.current
        r.lang = 'it-IT'
        r.continuous = true
        r.interimResults = true
        r.started = false
    }, [])
    
    useEffect(() => {
        const r = recognition.current
        if(onAir) {
            if(!r.started) {
                try {
                    r.addEventListener("result", handleResult)
                    r.started = true
                    r.start()
                } catch(e) {
                    console.log(e)
                }
            }
        } else {
            if(r.started) {
                r.removeEventListener("result", handleResult)
                r.stop()
                r.started = false
            }
        }
        return () => {
            r.removeEventListener("result", handleResult)
        }
    }, [onAir])

    return null
}