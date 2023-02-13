import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getOfflineTranscript = createAsyncThunk(
    'mic/getOfflineTranscript',
    async (data, thunkAPI) => {
        const res = await fetch("http://localhost:5000/getSpeechToText", {
            headers: {'Content-Type': 'application/json'},
            method: 'GET',
        })
        const json = await res.json()
        return json
    }
)

const options = {
	name: 'mic',
	initialState: { // Stato iniziale dell'applicazione
        intermediateResult: "",
        finalResult: "",
        isFinal: false,
        outputResult: "",
        transcriptReceived: false,
        hasError: false,
	},
	reducers: {
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
    extraReducers: builder => {
        builder
        .addCase(getOfflineTranscript.pending, state => {
            state.isFinal = false
            state.hasError = false
            state.transcriptReceived = false
        })
        .addCase(getOfflineTranscript.fulfilled, (state, { payload }) => {
            const { transcript } = payload
            state.finalResult = transcript
            state.isFinal = true
            state.hasError = false
            state.transcriptReceived = true
        })
        .addCase(getOfflineTranscript.rejected, state => {
            state.isFinal = false
            state.hasError = true
            state.transcriptReceived = true
        })
    }
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
export const selectTranscriptReceived = state => state.mic.transcriptReceived

// Recording result selectors
export const selectIntermediateResult = state => state.mic.intermediateResult
export const selectFinalResult = state => state.mic.finalResult
export const selectOutputResult = state => state.mic.outputResult