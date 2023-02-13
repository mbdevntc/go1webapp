import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOfflineTranscript, selectTranscriptReceived, setOutputResult } from "../features/MicrophoneSlice.js"


export const useOfflineRecognition = () => {
    const dispatch = useDispatch()
    const [ onAir, setOnAir ] = useState(false)
    const transcriptReceived = useSelector(selectTranscriptReceived)
    const timeoutId = useRef()
    console.log(transcriptReceived)

    useEffect(() => {
        // const getTranscriptFromServer = async () => {
        //     try {
        //         dispatch(setOutputResult("Loading..."))
        //         const timeoutId = setTimeout(() => {
        //             dispatch(setOutputResult("In ascolto..."))
        //         }, 1000)
        //         const res = await fetch("http://localhost:5000/getSpeechToText", {
        //             headers: {'Content-Type': 'application/json'},
        //             method: 'GET',
        //         })
        //         clearTimeout(timeoutId)
        //         const json = await res.json()
        //         console.log(json)
        //         setOnAir(false)
        //         return res
        //     } catch(e) {
        //         console.log(e)
        //     }
        // }
        
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