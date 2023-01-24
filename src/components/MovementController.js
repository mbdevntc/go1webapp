import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight, arrowLeftDown, arrowLeftUp, arrowRightUp, arrowRightDown } from "../utils/icons.js"


export const MovementController = ({ robot }) => {

    const goForward = async () => {
        const data = JSON.stringify({ speed: 0.25, time: 1000 })
        try {
            const res = await fetch("http://localhost:4001/goForward", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            return res
        } catch(e) {
            console.log(e)
        }
    }

    const goBackward = async () => {
        const data = JSON.stringify({ speed: 0.25, time: 1000 })
        try {
            const res = await fetch("http://localhost:4001/goBackward", {
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
                onClick={goForward}
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
                onClick={goBackward}
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