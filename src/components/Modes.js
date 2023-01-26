import { useDispatch, useSelector } from "react-redux"
import { changeMode, selectCurrentMode } from "../features/RobotSlice.js"
import { CustomSelect } from "./CustomSelect.js"


export const Modes = () => {
    const dispatch = useDispatch()
    const currentMode = useSelector(selectCurrentMode)

    const changeRobotMode = async (mode) => {
        const data = JSON.stringify({ mode })
        try {
            const res = await fetch("http://localhost:4001/mode", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: data
            })
            return res
        } catch(e) {
            console.log(e)
        }
    }

    const handleChangeMode = mode => {
        dispatch(changeMode(mode))
        changeRobotMode(mode)
    }

    const modes = [
        {label: "Walk", value: "walk"},
        {label: "Stand Up", value: "standUp"},
        {label: "Lie Down", value: "standDown"},
        {label: "Damping", value: "damping"},
        {label: "Run", value: "run"},
        {label: "Climb", value: "climb"},
        {label: "Stand", value: "stand"},
        {label: "Recover Stand", value: "recoverStand"},
        {label: "Cheers", value: "straightHand1"},
        {label: "Dance 1", value: "dance1"},
        {label: "Dance 2", value: "dance2"},
    ]

    return (
        <div className="main-interaction">
            <CustomSelect
                id={"select-mode"}
                value={currentMode}
                onChange={handleChangeMode}
                options={modes}
                label={"Modalità robot"}
            />
        </div>
    )
}