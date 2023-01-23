import { ControllerBtn } from "./ControllerBtn"
import { arrowUp, arrowDown } from "../utils/icons"


export const InclinationController = ({ robot }) => {

    return (
        <div className="controller">
            <div className="blank"></div>
            <ControllerBtn
                icon={arrowUp}
                onClick={() => robot.goForward()}
            />
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <ControllerBtn
                icon={arrowDown}
                onClick={() => robot.goBackward()}
            />
            <div className="blank"></div>
        </div>
    )
}