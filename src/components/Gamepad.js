import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectGamepadLeftAnalogAxes, selectGamepadRightAnalogAxes } from "../features/GamepadSlice.js"
import { selectCurrentMode, selectCurrentModeUser, selectIsConnected } from "../features/RobotSlice.js"
import { useGamepad } from "../hooks/useGamepad.js"
import { inclineAPI, moveAPI } from "./utils.js"

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
                move(0, lr, fb, 100)
            } else {
                move(0, 0, 0, 100)
            }
        }
        if(isConnected && currentMode === "stand") {
            const lookUpDown = parseFloat(rightAnalogAxes[1])
            const leanLR = parseFloat(rightAnalogAxes[0])
            if(Math.abs(lookUpDown) > 0.1 || Math.abs(leanLR) > 0.1) {
                incline(leanLR, 0, lookUpDown, 100)
            } else {
                incline(0, 0, 0, 100)
            }
        }
    })

    const move = async (leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time) => {
        await moveAPI(leftRightSpeed, turnLeftRightSpeed, forwardBackwardSpeed, time)
    }

    const incline = async (leanLR, twistLR, lookUpDown, time) => {
        await inclineAPI(leanLR, twistLR, lookUpDown, time)
    }

    return null
}