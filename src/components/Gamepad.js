import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectGamepadLeftAnalogAxes, selectGamepadRightAnalogAxes, selectIsGamepadConnected } from "../features/GamepadSlice.js"
import { changeSpeed, selectCurrentMode, selectCurrentModeUser, selectIsConnected } from "../features/RobotSlice.js"
import { useGamepad } from "../hooks/useGamepad.js"
import { inclineAPI, moveAPI } from "./utils.js"

// Componente che permette di utilizzare il joystick per controllare
// il cane robot

export const Gamepad = () => {
    const dispatch = useDispatch()
    useGamepad()
    const isConnected = useSelector(selectIsConnected)
    const isGamepadConnected = useSelector(selectIsGamepadConnected)
    const leftAnalogAxes = useSelector(selectGamepadLeftAnalogAxes)
    const rightAnalogAxes = useSelector(selectGamepadRightAnalogAxes)
    const currentMode = useSelector(selectCurrentModeUser)
    const mode = useSelector(selectCurrentMode)
    
    useEffect(() => {
        if(isGamepadConnected) {
            if(isConnected && mode === "walk") {
                const fb = parseFloat(leftAnalogAxes[1])
                const lr = parseFloat(leftAnalogAxes[0])
                if(Math.abs(fb) > 0.1 || Math.abs(lr) > 0.1) {
                    dispatch(changeSpeed({speedType: "speed", speed: Math.abs(fb)}))
                    dispatch(changeSpeed({speedType: "turningSpeed", speed: Math.abs(lr)}))
                    move(0, lr, fb, 150)
                } else {
                    dispatch(changeSpeed({speedType: "speed", speed: 0}))
                    dispatch(changeSpeed({speedType: "turningSpeed", speed: 0}))
                    move(0, 0, 0, 150)
                }
            }
            if(isConnected && currentMode === "Stand") {
                const lookUpDown = parseFloat(rightAnalogAxes[1])
                const leanLR = parseFloat(rightAnalogAxes[0])
                if(Math.abs(lookUpDown) > 0.1 || Math.abs(leanLR) > 0.1) {
                    incline(leanLR, 0, lookUpDown, 500)
                }
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