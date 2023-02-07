import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectRecordingStatus, setFinalResult, setIntermediateResult, setIsFinal } from "../features/MicrophoneSlice.js"

export const useRecognition = () => {
    const dispatch = useDispatch()
    const onAir = useSelector(selectRecordingStatus)

    const recognition = useRef(window.SpeechRecognition || new window.webkitSpeechRecognition())

    const handleResult = e => {
        const r = recognition.current
        let transcript = ""
        // for(let result of e.results) {
        for(let i = r.resultNum; i < e.results.length; i++) {
            transcript += e.results[i][0].transcript
        }
        // transcript = e.results[e.results.length - 1][0].transcript
        if(e.results[e.results.length - 1].isFinal) {
            dispatch(setIsFinal(true))
            dispatch(setFinalResult(transcript))
            r.resultNum++
        } else {
            dispatch(setIsFinal(false))
            dispatch(setIntermediateResult(transcript))
        }
    }

    useEffect(() => {
        const r = recognition.current
        r.lang = 'it-IT'
        r.continuous = true
        r.interimResults = true
        r.started = false
        r.resultNum = 0
    }, [])

    useEffect(() => {
        const r = recognition.current
        if(onAir) {
            if(!r.started) {
                try {
                    r.addEventListener("result", handleResult)
                    r.started = true
                    r.resultNum = 0
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