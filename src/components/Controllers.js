import { InclinationController } from "./InclinationMovement.js"
import { MovementController } from "./MovementController.js"
import { SpeedController } from "./SpeedController.js"

export const Controllers = () => {

    return (
        <div className="main-controllers">
            <MovementController />
            <InclinationController />
            <SpeedController />
        </div>
    )
}