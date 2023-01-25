import { useSelector } from "react-redux"
import { selectCurrentMode } from "../features/RobotSlice.js"
import { Button } from "./Button.js"


export const Modes = () => {
    const currentMode = useSelector(selectCurrentMode)

    return (
        <div className="main-interaction">
            <Button btnName="Lie down" active={currentMode === "lieDown"} />
            <Button btnName="Stand Up" active={currentMode === "standUp"} />
            <Button btnName="Walk" active={currentMode === "walk"} />
        </div>
    )
}