import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOfflineTranscript, selectTranscriptReceived, setOutputResult } from "../features/MicrophoneSlice.js"


export const useOfflineRecognition = () => {
    const dispatch = useDispatch()
    const [ onAir, setOnAir ] = useState(false)
    const transcriptReceived = useSelector(selectTranscriptReceived)
    const timeoutId = useRef()

    useEffect(() => {       
        if(onAir) {
            dispatch(setOutputResult("Loading..."))
            timeoutId.current = setTimeout(() => {
                dispatch(setOutputResult("In ascolto..."))
            }, 1000)
            dispatch(getOfflineTranscript())
        }
    }, [onAir])

    useEffect(() => {
        if(transcriptReceived) {
            setOnAir(false)
            clearTimeout(timeoutId.current)
        }
    }, [transcriptReceived])

    return { onAir, setOnAir }
}