import { ControllerBtn } from "./ControllerBtn.js"
import { arrowUp, arrowDown, arrowLeft, arrowRight, arrowLeftDown, arrowLeftUp, arrowRightUp, arrowRightDown } from "../utils/icons.js"
import { Title } from "./Title.js"
import { useSelector } from "react-redux"
import { selectLRSpeed, selectSpeed, selectTurningSpeed } from "../features/RobotSlice.js"
import { useRef } from "react"


export const MovementController = () => {
    // const isConnected = useSelector(selectIsConnected)

    const speed = useSelector(selectSpeed)
    const lrSpeed = useSelector(selectLRSpeed)
    const turningSpeed = useSelector(selectTurningSpeed)
    
    let intervalID = useRef()
    // const leftAnalogAxes = useSelector(selectGampadLeftAnalogAxes)
    
    // useEffect(() => {
    //     if(isConnected) {
    //         const fb = parseFloat(leftAnalogAxes[1])
    //         const lr = parseFloat(leftAnalogAxes[0])
    //         if(Math.abs(fb) > 0.1 || Math.abs(lr) > 0.1) {
    //             move(0, lr, fb, 100)
    //         } else {
    //             move(0, 0 ,0, 100)
    //         }
    //     }
    // })

    const move = async (leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time) => {
        const data = JSON.stringify({ leftRightspeed, turnLeftRightSpeed, forwardBackwardSpeed, time})
        try {
            const res = await fetch("http://localhost:4001/move", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            console.log(res)
            return res
        } catch(e) {
            console.log(e)
        }
    }
    
    const continueMove = cb => {
        cb()
        intervalID.current = setInterval(() => cb(), 275)
        console.log(intervalID.current)
    }
    
    const stop = () => {
        move(0, 0 ,0, 100)
        clearInterval(intervalID.current)
    }

    return (
        <div className="controller-block">
            <Title title={"Movimento"} />
            <div className="controller">
                {/* Pulsante avanti sinistra */}
                <ControllerBtn
                    icon={arrowLeftUp}
                    // onMouseDown={() => continueMove(() => move((-lrSpeed, 0, speed, 250))}
                    onMouseDown={() => continueMove(() => move(0, -turningSpeed, speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                    />

                {/* Pulsante avanti */}
                <ControllerBtn
                    icon={arrowUp}
                    onMouseDown={() => continueMove(() =>  move(0, 0, speed, 250))}
                    onMouseUp={stop}
                />

                {/* Pulsante avanti destra */}
                <ControllerBtn
                    icon={arrowRightUp}
                    // onMouseDown={() => continueMove(() => move(lrSpeed, 0, speed, 250))}
                    onMouseDown={() => continueMove(() => move(0, turningSpeed, speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />

                {/* Pulsante sinistra */}
                <ControllerBtn
                    icon={arrowLeft}
                    onMouseDown={() => continueMove(() => move(-lrSpeed, 0, 0, 250))}
                    onMouseUp={stop}
                />

                {/* Pulsante stop */}
                <ControllerBtn
                    icon={"STOP"}
                    className="alert"
                    onMouseDown={stop}
                    onMouseUp={stop}
                />

                {/* Pulsante destra */}
                <ControllerBtn
                    icon={arrowRight}
                    onMouseDown={() => continueMove(() => move(lrSpeed, 0, 0, 250))}
                    onMouseUp={stop}
                />

                {/* Pulsante inidietro sinistra */}
                <ControllerBtn
                    icon={arrowLeftDown}
                    // onMouseDown={() => continueMove(() => move(-lrSpeed, 0, -speed, 250))}
                    onMouseDown={() => continueMove(() => move(0, -turningSpeed, -speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />

                {/* Pulsante indietro */}
                <ControllerBtn
                    icon={arrowDown}
                    onMouseDown={() => continueMove(() => move(0, 0, -speed, 250))}
                    onMouseUp={stop}
                 />

                {/* Pulsante indietro destra */}
                <ControllerBtn
                    icon={arrowRightDown}
                    // onMouseDown={() => continueMove(() => move(lrSpeed, 0, -speed, 250))}
                    onMouseDown={() => continueMove(() => move(0, turningSpeed, -speed, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />

                <ControllerBtn
                    icon={arrowLeft}
                    // onMouseDown={() => continueMove(() => move(lrSpeed, 0, -speed, 250))}
                    onMouseDown={() => continueMove(() => move(0, -turningSpeed, 0, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />
                <div className="blank"></div>
                <ControllerBtn
                    icon={arrowRight}
                    // onMouseDown={() => continueMove(() => move(lrSpeed, 0, -speed, 250))}
                    onMouseDown={() => continueMove(() => move(0, turningSpeed, 0, 250))}
                    onMouseUp={stop}
                    className={"btn-sm"}
                />
            </div>
        </div>
    )
}