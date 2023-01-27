import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectCurrentMode, selectGampadLeftAnalogAxes, selectGampadRightAnalogAxes, selectIsConnected } from "../features/RobotSlice.js"
import { useGamepad } from "../hooks/useGamepad.js"

export const Gamepad = () => {
    useGamepad()
    const isConnected = useSelector(selectIsConnected)
    const leftAnalogAxes = useSelector(selectGampadLeftAnalogAxes)
    const rightAnalogAxes = useSelector(selectGampadRightAnalogAxes)
    const currentMode = useSelector(selectCurrentMode)
    const mode = useSelector(selectCurrentMode)
    
    useEffect(() => {
        if(isConnected && mode === "walk") {
            const fb = parseFloat(leftAnalogAxes[1])
            const lr = parseFloat(leftAnalogAxes[0])
            if(Math.abs(fb) > 0.1 || Math.abs(lr) > 0.1) {
                control(0, lr, fb, 100, "move")
            } else {
                control(0, 0 ,0, 100, "move")
            }
        }
        if(isConnected && currentMode === "stand") {
            const inclination = parseFloat(rightAnalogAxes[1])
            const lean = parseFloat(rightAnalogAxes[0])
            if(Math.abs(inclination) > 0.1 || Math.abs(lean) > 0.1) {
                control(lean, 0, inclination, 100, "incline")
            } else {
                control(0, 0, 0, 100, "incline")
            }
        }
    })

    const control = async (leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time, mode) => {
        const data = JSON.stringify({ leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time})
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
    return
}