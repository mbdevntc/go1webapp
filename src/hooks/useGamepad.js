import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { resetGamepad, setGamepad } from "../features/RobotSlice.js"

export const useGamepad = () => {
    const dispatch = useDispatch()
    // const gamepad = useSelector(selectGampad)
    let requestId = useRef(null)
    
    const connect = (e, log) => {
        const gamepad = e.gamepad
        if(log === "complete") {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gamepad.index, gamepad.id,
            gamepad.buttons.length, gamepad.axes.length);
        } else if (log === "short") {
            console.log("Gamepad connected")
        }
        const axes = gamepad.axes
            const buttons = []
            for(let button of gamepad.buttons) {
                buttons.push(button.value)
            }
        dispatch(setGamepad({ axes: axes, buttons: buttons }))
        requestId.current = setInterval(start, 100)
    }

    const disconnect = (e, log) => {
        const gamepad = e.gamepad
        if(log === "complete") {
            console.log("Gamepad disconnected from index %d: %s", gamepad.index, gamepad.id);
        } else if (log === "short") {
            console.log("Gamepad disconnected")
        }
        dispatch(resetGamepad())
        clearInterval(requestId.current)
    } 

    const connectionListener = ({ log }) => {
        window.addEventListener("gamepadconnected", e => {
            connect(e, log)
        });
    }

    const disconnectionListener = ({ log }) => {
        window.addEventListener("gamepaddisconnected", e => {
            disconnect(e, log)
        });
    }
    
    const start = () => {
        if(window.navigator.getGamepads()) {
            const gamepad = window.navigator.getGamepads()[0]
            const axes = gamepad.axes
            const buttons = []
            for(let button of gamepad.buttons) {
                buttons.push(button.value)
            }
            dispatch(setGamepad({ axes: axes, buttons: buttons }))
        }
        
    }

    useEffect(() => {
        connectionListener({ log: "short"})
        disconnectionListener({ log: "short"})
        return () => {
            window.removeEventListener("gamepadconnected", connect)
            window.removeEventListener("gamepaddiscconnected", disconnect)
        }
    })

}