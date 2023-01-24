import { InclinationController } from "./InclinationMovement.js"
import { MovementController } from "./MovementController.js"

export const ManualCommands = ({ robot }) => {
    return (
        <div className="main">
            <MovementController robot={robot}/>
            <InclinationController robot={robot} />
        </div>
    )
}