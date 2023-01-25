import { InclinationController } from "./InclinationMovement.js"
import { MovementController } from "./MovementController.js"
import { SpeedController } from "./SpeedController.js"

export const ManualCommands = () => {

    return (
        <div className="main-interaction">
            <MovementController />
            <InclinationController />
            <SpeedController />
        </div>
    )
}