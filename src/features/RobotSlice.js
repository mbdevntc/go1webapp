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
	initialState: { // Stato iniziale dell'applicazione
        connected: false,
        speed: 0, 
        lrSpeed: 0,
        turningSpeed: 0,
        currentMode: "standUp",
		currentModeUser: "Stand Up",
		interactionMsg: [],
		messages: 0,
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
        changeSpeed: (state, { payload }) => { // Funzione che permette di modificare una delle tre diverse
			switch(payload.speedType) {        // velocità degli attuatori del cane robot (nello stato dell'applicazione)
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
        changeMode: (state, { payload }) => { // Funzione che permette di cambiare modalità del cane robot
            state.currentMode = payload		  // (nello stato dell'applicazione)
			switch (payload) {
				case "walk":
					state.currentModeUser = "Walk";
					break
				case "standUp":
					state.currentModeUser = "Stand Up";
					break
				case "standDown":
					state.currentModeUser = "Lie Down";
					break
				case "damping":
					state.currentModeUser = "Damping";
					break
				case "run":
					state.currentModeUser = "Run";
					break
				case "climb":
					state.currentModeUser = "Climb";
					break
				case "stand":
					state.currentModeUser = "Stand";
					break
				case "recoverStand":
					state.currentModeUser = "Recover Stand";
					break
				case "straightHand1":
					state.currentModeUser = "Cheers";
					break
				case "dance1":
					state.currentModeUser = "Dance 1";
					break
				case "dance2":
					state.currentModeUser = "Dance 2";
					break
				default:
					break
			}
        },
		setInteractionMsg: (state, { payload }) => {  // Funzione che permette di creare una nuova notifica
			const { msg, mode, expiringIn } = payload
			const dateOptions = {
				weeday: 'short',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}
			const interactionMsg = {
				id: state.messages,
				date: new Date().toLocaleDateString(undefined, dateOptions),
				msg,
				mode,
				secondsRemaining: expiringIn || 10,
			}
			state.interactionMsg.push(interactionMsg)
			state.messages++
		},
		decrementTime: (state, { payload }) => { 	// Funzione necessaria a decrementare il tempo rimanente
			for(let msg of state.interactionMsg) {  // alla visualizzazione di una notifica
				if (msg.id === payload) {
					msg.secondsRemaining -= 1
				}
			}
		},
		resetInteractionMsg: (state, { payload }) => { // Eliminazione di una notifica dopo che il suo tempo è scaduto
			state.interactionMsg = state.interactionMsg.filter(msg => msg.id !== payload)
		},
		setGamepad: (state, { payload }) => { // Funzione che permette di gestire lo stato attuale
			const { axes, buttons } = payload // dei controlli del gamepad
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
		resetGamepad: state => { // Funzione che permette di resettare lo stato del gamepad
			state.gamepad = {    // quando questo viene disconnesso
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
	decrementTime,
	setGamepad,
	resetGamepad
} = robot.actions

// Connection and robot mode info selectors
export const selectIsConnected = state => state.robot.connected
export const selectCurrentMode = state => state.robot.currentMode
export const selectCurrentModeUser = state => state.robot.currentModeUser

// Speed selectors
export const selectSpeed = state => state.robot.speed
export const selectLRSpeed = state => state.robot.lrSpeed
export const selectTurningSpeed = state => state.robot.turningSpeed

// Interaction messages selectors
export const selectInteractionMsg = state => state.robot.interactionMsg
// export const getMsgRemainingTime = (state, msgId) => state.robot.interactionMsg.filter(msg => msg.id === msgId).secondsRemaining

// Gamepad selectors
export const selectGamepad = state => state.robot.gamepad
export const selectGamepadLeftAnalogAxes = state => state.robot.gamepad.leftAnalogAxes
export const selectGamepadRightAnalogAxes = state => state.robot.gamepad.rightAnalogAxes