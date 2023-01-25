import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight } from "../utils/icons.js"
import { Title } from "./Title.js"


export const InclinationController = () => {

    const incline = async (inclination, time) => {
        const data = JSON.stringify({ speed: 1, time })
        const incline = inclination ? "lookUp" : "lookDown"
        try {
            const res = await fetch(`http://localhost:4001/${incline}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            return res
        } catch(e) {
            console.log(e)
        }
    }

    const lean = async (leanLR, time) => {
        const data = JSON.stringify({ speed: 1, time })
        const lean = leanLR ? "leanLeft" : "leanRight"
        try {
            const res = await fetch(`http://localhost:4001/${lean}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            return res
        } catch(e) {
            console.log(e)
        }
    }

    let intervalID
    const continueMove = cb => {
        cb()
        intervalID = setInterval(() => cb(), 275)
    }

    return (
        <div className="controller-block">
            <Title title={"Inclinazione"}></Title>
            <div className="controller">
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowUp}
                    onMouseDown={() => continueMove(() => incline(false, 250))}
                    onMouseUp={() => clearInterval(intervalID)}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowLeft}
                    onMouseDown={() => continueMove(() => lean(true, 250))}
                    onMouseUp={() => clearInterval(intervalID)}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowRight}
                    onMouseDown={() => continueMove(() => lean(false, 250))}
                    onMouseUp={() => clearInterval(intervalID)}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowDown}
                    onMouseDown={() => continueMove(() => incline(true, 250))}
                    onMouseUp={() => clearInterval(intervalID)}
                />
                <div className="blank"></div>
            </div>
        </div>

    )
}