import { useEffect, useRef, useState } from "react"

export const useGamepad = () => {
    const [gamepads, setGamepads] = useState([{axes: [0, 0, 0, 0]}])
    let requestId = useRef(null)

    const addGamepad = gamepad => {
        setGamepads(prevGP => {return {...prevGP, [gamepad.index]: gamepad}})
    }

    const removeGamepad = index => {
        setGamepads(prevGP => {return {...prevGP, [index]: null}})
    }
    
    const connect = (e, log) => {
        if(log === "complete") {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index, e.gamepad.id,
            e.gamepad.buttons.length, e.gamepad.axes.length);
        } else if (log === "short") {
            console.log("Gamepad connected")
        }
        addGamepad(e.gamepad)
        logAxes()
    }

    const disconnect = (e, log) => {
        if(log === "complete") {
            console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
        } else if (log === "short") {
            console.log("Gamepad disconnected")
        }
        removeGamepad(e.gamepad.index)
        cancelAnimationFrame(requestId)
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

    const logAxes = () => {
        console.log(window.navigator.getGamepads())
        for(let gamepad of window.navigator.getGamepads()) {
            if(gamepad) {
                addGamepad(gamepad)
            }
        }
        const axes = gamepads ? gamepads[0].axes : []
        console.log(axes)
        requestId = requestAnimationFrame(logAxes)
    }

    useEffect(() => {
        connectionListener({ log: "short"})
        disconnectionListener({ log: "short"})
        return () => {
            console.log("ciao")
            window.removeEventListener("gamepadconnected", connect)
            window.removeEventListener("gamepaddiscconnected", disconnect)
        }
    })

    return gamepads
}