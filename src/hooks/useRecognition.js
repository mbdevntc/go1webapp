import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setFinalResult, setIntermediateResult, setIsFinal, setOutputResult } from "../features/MicrophoneSlice.js"

export const useRecognition = () => {
    const dispatch = useDispatch()
    const [ onAir, setOnAir ] = useState(false)

    const recognition = useRef(window.SpeechRecognition || new window.webkitSpeechRecognition())

    const handleResult = e => {
        const r = recognition.current
        let transcript = ""
        for(let i = r.resultNum; i < e.results.length; i++) {
            transcript += e.results[i][0].transcript
        }
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
                    dispatch(setOutputResult("In ascolto..."))
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

    return { onAir, setOnAir }
}