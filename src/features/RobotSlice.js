import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const round = num => {
	return (Math.floor(num / 0.05 ) * 0.05).toFixed(2)
}

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
        speed: 0, 
        lrSpeed: 0,
        turningSpeed: 0,
        currentMode: "standUp",
		interactionMsg: [],
		gamepad: {
			leftAnalogAxes: [0, 0], 
			rightAnalogAxes: [0, 0],
			buttons: {
				'a': 0, // buttons[0]
				'b': 0, // buttons[1]
				'x': 0, // buttons[2]
				'y': 0, // buttons[3]
				'lb': 0, // buttons[4]
				'rb': 0, // buttons[5]
				'lt': 0, // buttons[6] float
				'rt': 0, // buttons[7] float
				'select': 0, // buttons[8]
				'start': 0, // buttons[9]
				'leftPad': 0, // buttons[10]
				'rightPad': 0, // buttons[11]
				'up': 0, // buttons[12]
				'down': 0, // buttons[13]
				'left': 0, // buttons[14]
				'right': 0, // buttons[15]
				'main': 0, // buttons[16] XBOX/PS button
			}
		},
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
		setInteractionMsg: (state, { payload }) => {
			const msg = payload
			const dateOptions = {
				weeday: 'short',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}
			const interactionMsg = {
				date: new Date().toLocaleDateString(undefined, dateOptions),
				msg,

			}
			state.interactionMsg.push(interactionMsg)
		},
		resetInteractionMsg: (state, { payload }) => {
			state.interactionMsg.splice(payload, 1)
		},
		setGamepad: (state, { payload }) => {
			const { axes, buttons } = payload
			state.gamepad = {
				leftAnalogAxes: [round(axes[0]), -round(axes[1])], 
				rightAnalogAxes: [round(axes[2]), round(axes[3])],
				buttons: {
					'a': round(buttons[0]), 
					'b': round(buttons[1]), 
					'x': round(buttons[2]), 
					'y': round(buttons[3]), 
					'lb': round(buttons[4]), 
					'rb': round(buttons[5]), 
					'lt': round(buttons[6]),
					'rt': round(buttons[7]),  
					'select': round(buttons[8]), 
					'start': round(buttons[9]), 
					'leftPad': round(buttons[10]),
					'rightPad': round(buttons[11]),
					'up': round(buttons[12]),
					'down': round(buttons[13]),
					'left': round(buttons[14]),
					'right': round(buttons[15]),
					'main': round(buttons[16]), 
				} 
			}
			state.speed = Math.abs(round(axes[1])) > 0.1 ? Math.abs(round(axes[1])) : 0
			state.turningSpeed = Math.abs(round(axes[0])) > 0.1 ? Math.abs(round(axes[0])) : 0
			state.inclination = Math.abs(round(axes[3])) > 0.1 ? Math.abs(round(axes[3])) : 0
			state.lean = Math.abs(round(axes[2])) > 0.1 ? Math.abs(round(axes[2])) : 0
		},
		resetGamepad: state => {
			state.gamepad = {
				leftAnalogAxes: [0, 0], 
				rightAnalogAxes: [0, 0],
				buttons: {
					'a': 0, 
					'b': 0, 
					'x': 0, 
					'y': 0, 
					'lb': 0, 
					'rb': 0, 
					'lt': 0, 
					'rt': 0, 
					'select': 0, 
					'start': 0, 
					'leftPad': 0, 
					'rightPad': 0, 
					'up': 0, 
					'down': 0, 
					'left': 0, 
					'right': 0, 
					'main': 0,
				}
			}
		}
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
    changeMode,
	setInteractionMsg,
	resetInteractionMsg,
	setGamepad,
	resetGamepad
} = robot.actions

// Connection and robot mode info selectors
export const selectIsConnected = state => state.robot.connected
export const selectCurrentMode = state => state.robot.currentMode

// Speed selectors
export const selectSpeed = state => state.robot.speed
export const selectLRSpeed = state => state.robot.lrSpeed
export const selectTurningSpeed = state => state.robot.turningSpeed

// Interaction messages selectors
export const selectInteractionMsg = state => state.robot.interactionMsg
// export const selectInteractionMsg = state => state.robot.interactionMsg[state.robot.interactionMsg.length - 1]

// Gamepad selectors
export const selectGamepad = state => state.robot.gamepad
export const selectGamepadLeftAnalogAxes = state => state.robot.gamepad.leftAnalogAxes
export const selectGamepadRightAnalogAxes = state => state.robot.gamepad.rightAnalogAxes