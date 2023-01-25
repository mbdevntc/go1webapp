import { useState } from "react"
import { InclinationController } from "./InclinationMovement.js"
import { MovementController } from "./MovementController.js"
import { SpeedController } from "./SpeedController.js"

export const ManualCommands = () => {
    const [ speed, setSpeed ] = useState(0.25)
    const [ lrSpeed, setLRSpeed ] = useState(0.25)
    const [ turningSpeed, setTurningSpeed ] = useState(0.25)

    return (
        <div className="main-interaction">
            <MovementController 
                speed={speed}
                lrSpeed={lrSpeed}
                turningSpeed={turningSpeed}
            />
            <InclinationController />
            <SpeedController 
                speed={speed} 
                onSpeedChange={({ target }) => setSpeed(target.value)}
                lrSpeed={lrSpeed} 
                onLRSpeedChange={({ target }) => setLRSpeed(target.value)}
                turningSpeed={turningSpeed} 
                onTurningSpeedChange={({ target }) => setTurningSpeed(target.value)}
            />
        </div>
    )
}