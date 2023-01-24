import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown } from "../utils/icons.js"


export const InclinationController = () => {

    return (
        <div className="controller">
            <div className="blank"></div>
            <ControllerBtn
                icon={arrowUp}
                onClick={() => console.log("ciao")}
            />
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <ControllerBtn
                icon={arrowDown}
                onClick={() => console.log("ciao di nuovo")}
            />
            <div className="blank"></div>
        </div>
    )
}