import { useDispatch, useSelector } from "react-redux"
import { changeSpeed, selectLRSpeed, selectSpeed, selectTurningSpeed } from "../features/RobotSlice.js"
import { Slider } from "./Slider.js"
import { Title } from "./Title.js"

// Componente per gestire le diverse velocità degli attuatori del cane robot
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
            <Slider label="Velocità di avanzamento" value={speed} onChange={e => handleChangeSpeed(e, "speed")} />
            <Slider label="Velocità traslazione SX/DX" value={lrSpeed} onChange={e => handleChangeSpeed(e, "lrSpeed")} />
            <Slider label="Velocità rotazione" value={turningSpeed} onChange={e => handleChangeSpeed(e, "turningSpeed")} />
        </div>

    )
}