import { InclinationController } from "./InclinationMovement.js"
import { MovementController } from "./MovementController.js"

export const ManualCommands = ({ robot }) => {
    return (
        <div className="main">
            <MovementController />
            <InclinationController />
        </div>
    )
}