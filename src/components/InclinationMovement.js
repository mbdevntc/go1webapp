import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight } from "../utils/icons.js"
import { Title } from "./Title.js"
import { useRef } from "react"


export const InclinationController = () => {
    let intervalID = useRef()
    // const rightAnalogAxes = useSelector(selectGampadRightAnalogAxes)
    // const isConnected = useSelector(selectIsConnected)
    // const currentMode = useSelector(selectCurrentMode)
    
    // useEffect(() => {
    //     if(isConnected && currentMode === "stand") {
    //         const inclination = parseFloat(rightAnalogAxes[1])
    //         const lean = parseFloat(rightAnalogAxes[0])
    //         if(Math.abs(inclination) > 0.1 || Math.abs(lean) > 0.1) {
    //             handleInclination(lean, inclination, 100)
    //         } else {
    //             handleInclination(0, 0 ,0, 100)
    //         }
    //     }
    // })

    // const handleInclination = async (lean, incline, time) => {
    //     const data = JSON.stringify({ leftRightspeed: lean, turnLeftRightSpeed: 0, forwardBackwardSpeed: incline, time})
    //     try {
    //         const res = await fetch("http://localhost:4001/incline", {
    //             headers: {'Content-Type': 'application/json'},
    //             method: 'POST',
    //             body: data
    //         })
    //         console.log(res)
    //         return res
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }

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

    const continueMove = cb => {
        cb()
        intervalID.current = setInterval(() => cb(), 275)
    }

    const stop = () => clearInterval(intervalID.current)

    return (
        <div className="controller-block">
            <Title title={"Inclinazione"}></Title>
            <div className="controller">
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowUp}
                    onMouseDown={() => continueMove(() => incline(false, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowLeft}
                    onMouseDown={() => continueMove(() => lean(true, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowRight}
                    onMouseDown={() => continueMove(() => lean(false, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowDown}
                    onMouseDown={() => continueMove(() => incline(true, 250))}
                    onMouseUp={stop}
                />
                <div className="blank"></div>
            </div>
        </div>

    )
}