import { createSlice } from '@reduxjs/toolkit'
import { changeSpeed } from './RobotSlice.js'

const round = num => {
	return (Math.floor(num / 0.05 ) * 0.05).toFixed(2)
}

const options = {
	name: 'gamepad',
	initialState: { // Stato iniziale dell'applicazione
		isGamepadConnected: false,
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
	},
	reducers: {
		toggleIsConnected: (state, { payload }) => {
			state.isGamepadConnected = payload
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
}

const gamepad = createSlice(options)

export default gamepad.reducer

export const {
	setGamepad,
	resetGamepad,
	toggleIsConnected
} = gamepad.actions

// Gamepad selectors
export const selectGamepad = state => state.gamepad.gamepad
export const selectIsGamepadConnected = state => state.gamepad.isGamepadConnected
export const selectGamepadLeftAnalogAxes = state => state.gamepad.gamepad.leftAnalogAxes
export const selectGamepadRightAnalogAxes = state => state.gamepad.gamepad.rightAnalogAxes