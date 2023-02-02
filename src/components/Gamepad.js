import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectGamepadLeftAnalogAxes, selectGamepadRightAnalogAxes } from "../features/GamepadSlice.js"
import { selectCurrentMode, selectCurrentModeUser, selectIsConnected } from "../features/RobotSlice.js"
import { useGamepad } from "../hooks/useGamepad.js"

// Componente che permette di utilizzare il joystick per controllare
// il cane robot

export const Gamepad = () => {
    useGamepad()
    const isConnected = useSelector(selectIsConnected)
    const leftAnalogAxes = useSelector(selectGamepadLeftAnalogAxes)
    const rightAnalogAxes = useSelector(selectGamepadRightAnalogAxes)
    const currentMode = useSelector(selectCurrentModeUser)
    const mode = useSelector(selectCurrentMode)
    
    useEffect(() => {
        if(isConnected && mode === "walk") {
            const fb = parseFloat(leftAnalogAxes[1])
            const lr = parseFloat(leftAnalogAxes[0])
            if(Math.abs(fb) > 0.1 || Math.abs(lr) > 0.1) {
                control(0, lr, fb, 100, "move")
            } else {
                control(0, 0, 0, 100, "move")
            }
        }
        if(isConnected && currentMode === "stand") {
            const lookUpDown = parseFloat(rightAnalogAxes[1])
            const leanLR = parseFloat(rightAnalogAxes[0])
            if(Math.abs(lookUpDown) > 0.1 || Math.abs(leanLR) > 0.1) {
                control(leanLR, 0, lookUpDown, 100, "incline")
            } else {
                control(0, 0, 0, 100, "incline")
            }
        }
    })

    const control = async (leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time, mode) => {
        const data = JSON.stringify({ leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time})
        try {
            const res = await fetch(`http://localhost:4001/${mode}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            return res
        } catch(e) {
            console.log(e)
        }
    }

    return null
}