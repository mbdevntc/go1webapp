import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight, arrowLeftDown, arrowLeftUp, arrowRightUp, arrowRightDown } from "../utils/icons.js"


export const MovementController = () => {

    const move = async ({ leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time }) => {
        const data = JSON.stringify({ leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time})
        try {
            const res = await fetch("http://localhost:4001/move", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            return res
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="controller">
            {/* Pulsante avanti sinistra */}
            <ControllerBtn
                icon={arrowLeftUp}
                onClick={() => move(-0.25, 0, 0.25, 1000)}
                className={"btn-sm"}
                />

            {/* Pulsante avanti */}
            <ControllerBtn
                icon={arrowUp}
                onClick={() => move(0, 0, 0.25, 1000)}
            />

            {/* Pulsante avanti destra */}
            <ControllerBtn
                icon={arrowRightUp}
                onClick={() => move(0.25, 0, 0.25, 1000)}
                className={"btn-sm"}
            />

            {/* Pulsante sinistra */}
            <ControllerBtn
                icon={arrowLeft}
                onClick={() => move(-0.25, 0, 0, 1000)}
            />
            <div className="blank"></div>

            {/* Pulsante destra */}
            <ControllerBtn
                icon={arrowRight}
                onClick={() => move(0.25, 0, 0, 1000)}
            />

            {/* Pulsante inidietro sinistra */}
            <ControllerBtn
                icon={arrowLeftDown}
                onClick={() => move(-0.25, 0, -0.25, 1000)}
                className={"btn-sm"}
            />

            {/* Pulsante indietro */}
            <ControllerBtn
                icon={arrowDown}
                onClick={() => move(0, 0, -0.25, 1000)}
            />

            {/* Pulsante indietro destra */}
            <ControllerBtn
                icon={arrowRightDown}
                onClick={() => move(0.25, 0, -0.25, 1000)}
                className={"btn-sm"}
            />
        </div>
    )
}