import { useDispatch, useSelector } from "react-redux"
import { changeSpeed, selectLRSpeed, selectSpeed, selectTurningSpeed } from "../features/RobotSlice.js"
import { Slider } from "./Slider.js"
import { Title } from "./Title.js"


export const SpeedController = () => {
    const dispatch = useDispatch()
    const speed = useSelector(selectSpeed)
    const lrSpeed = useSelector(selectLRSpeed)
    const turningSpeed = useSelector(selectTurningSpeed)

    const handleChangeSpeed = ({ target }, speedType) => {
        dispatch(changeSpeed({speed: target.value, speedType}))
    }

    return (
        <div className="controller-block">
            <Title title={"Velocità"} />
            <Slider label="Velocità movimento" value={speed} onChange={e => handleChangeSpeed(e, "speed")} />
            <Slider label="Velocità rotazione" value={lrSpeed} onChange={e => handleChangeSpeed(e, "lrSpeed")} />
            <Slider label="Velocità svolta" value={turningSpeed} onChange={e => handleChangeSpeed(e, "turningSpeed")} />
        </div>

    )
}