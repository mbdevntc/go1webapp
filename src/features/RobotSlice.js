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
	initialState: { // Stato iniziale dell'applicazione
        connected: false,
        speed: 0.5, 
        lrSpeed: 0.5,
        turningSpeed: 0.5,
        currentMode: "standUp",
		currentModeUser: "Stand Up",
		interactionMsg: [],
		messages: 0,
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