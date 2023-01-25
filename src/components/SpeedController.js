import { Slider } from "./Slider.js"
import { Title } from "./Title.js"


export const SpeedController = ({ speed, onSpeedChange, lrSpeed, onLRSpeedChange, turningSpeed, onTurningSpeedChange}) => {

    return (
        <div className="controller-block">
            <Title title={"Velocità"} />
            <Slider label="Velocità movimento" value={speed} onChange={onSpeedChange} />
            <Slider label="Velocità rotazione" value={lrSpeed} onChange={onLRSpeedChange} />
            <Slider label="Velocità svolta" value={turningSpeed} onChange={onTurningSpeedChange} />
        </div>

    )
}