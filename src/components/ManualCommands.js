import { InclinationController } from "./InclinationMovement"
import { MovementController } from "./MovementController"

export const ManualCommands = ({ robot }) => {
    return (
        <div className="main">
            <MovementController robot={robot}/>
            <InclinationController robot={robot} />
        </div>
    )
}