import { createSlice } from '@reduxjs/toolkit'

const options = {
	name: 'mic',
	initialState: { // Stato iniziale dell'applicazione
		recording: false,
        intermediateResult: "",
        finalResult: ""
	},
	reducers: {
		toggleRecording: state => {
            state.recording = !state.recording
        },
        setIntermediateResult: (state, { payload }) => {
            state.intermediateResult = payload
        },
        setFinalResult: (state, { payload }) => {
            state.finalResult = payload
        },
 	},
}

const mic = createSlice(options)

export default mic.reducer

export const {
	toggleRecording,
    setIntermediateResult,
    setFinalResult
} = mic.actions

// Recording selector
export const selectRecordingStatus = state => state.mic.recording

// Recording result selectors
export const selectIntermediateResult = state => state.mic.intermediateResult
export const selectFinalResult = state => state.mic.finalResult