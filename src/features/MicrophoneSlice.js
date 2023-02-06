import { createSlice } from '@reduxjs/toolkit'

const options = {
	name: 'mic',
	initialState: { // Stato iniziale dell'applicazione
		recording: false,
        intermediateResult: "",
        finalResult: "",
        isFinal: false,
        outputResult: ""
	},
	reducers: {
		toggleRecording: state => {
            state.recording = !state.recording
        },
        setIsFinal: (state, { payload }) => {
            state.isFinal = payload
        },
        setIntermediateResult: (state, { payload }) => {
            state.intermediateResult = payload
        },
        setFinalResult: (state, { payload }) => {
            state.finalResult = payload
        },
        setOutputResult: (state, { payload }) => {
            state.outputResult = payload
        }
 	},
}

const mic = createSlice(options)

export default mic.reducer

export const {
	toggleRecording,
    setIsFinal,
    setIntermediateResult,
    setFinalResult,
    setOutputResult
} = mic.actions

// Recording selectors
export const selectRecordingStatus = state => state.mic.recording
export const selectIsFinal = state => state.mic.isFinal

// Recording result selectors
export const selectIntermediateResult = state => state.mic.intermediateResult
export const selectFinalResult = state => state.mic.finalResult
export const selectOutputResult = state => state.mic.outputResult