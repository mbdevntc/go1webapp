import { ControllerBtn } from "./ControllerBtn"
import { arrowUp, arrowDown, arrowLeft, arrowRight, arrowLeftDown, arrowLeftUp, arrowRightUp, arrowRightDown } from "../utils/icons"


export const MovementController = ({ robot }) => {

    return (
        <div className="controller">
            <ControllerBtn
                icon={arrowLeftUp}
                onClick={() => {
                    robot.goForward()
                    robot.goLeft()
                }}
                className={"btn-sm"}
            />
            <ControllerBtn
                icon={arrowUp}
                onClick={() => robot.goForward(0.25, 1000)}
            />
            <ControllerBtn
                icon={arrowRightUp}
                onClick={() => {
                    robot.goForward()
                    robot.goRight()
                }}
                className={"btn-sm"}
            />
            <ControllerBtn
                icon={arrowLeft}
                onClick={() => robot.goLeft()}
            />
            <div className="blank"></div>
            <ControllerBtn
                icon={arrowRight}
                onClick={() => robot.goRight()}
            />
            <ControllerBtn
                icon={arrowLeftDown}
                onClick={() => {
                    robot.goBackward()
                    robot.goLeft()
                }}
                className={"btn-sm"}
            />
            <ControllerBtn
                icon={arrowDown}
                onClick={() => robot.goBackward()}
            />
            <ControllerBtn
                icon={arrowRightDown}
                onClick={() => {
                    robot.goBackward()
                    robot.goRight()
                }}
                className={"btn-sm"}
            />
        </div>
    )
}