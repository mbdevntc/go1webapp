import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const isConnected = createAsyncThunk(
	'robot/isConnected',
	async (rb, thunkAPI) => {
		const res = await fetch("http://localhost:4001/isConnected")
		const json = await res.json()
		return json
	}
)

const options = {
	name: 'robot',
	initialState: {
        connected: false,
        speed: 0.25, 
        lrSpeed: 0.25,
        turningSpeed: 0.25,
        currentMode: "standUp",
		isLoading:	false,
		hasError: false,
	},
	reducers: {
        changeSpeed: (state, { payload }) => {
			switch(payload.speedType) {
				case "speed":
					state.speed = payload.speed
					break
				case "lrSpeed":
					state.lrSpeed = payload.speed
					break
				case "turningSpeed":
					state.turningSpeed = payload.speed
					break
				default:
					break
			}
        },
        changeMode: (state, { payload }) => {
            state.currentMode = payload
        },
	},
	extraReducers: builder => {
		builder
        .addCase(isConnected.pending, state => {
			state.isLoading = true
			state.hasError = false
		})
		.addCase(isConnected.fulfilled, (state, action) => {
			state.connected = action.payload.connected
			state.isLoading = false
			state.hasError = false
		})
		.addCase(isConnected.rejected, state => {
			state.isLoading = false
			state.hasError = true
		})
	},
}

const robot = createSlice(options)

export default robot.reducer

export const {
    changeSpeed,
    changeMode
} = robot.actions

export const selectIsConnected = state => state.robot.connected
export const selectSpeed = state => state.robot.speed
export const selectLRSpeed = state => state.robot.lrSpeed
export const selectTurningSpeed = state => state.robot.turningSpeed
export const selectCurrentMode = state => state.robot.currentMode

