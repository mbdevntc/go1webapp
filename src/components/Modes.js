import { useDispatch, useSelector } from "react-redux"
import { changeMode, selectCurrentMode, selectIsConnected } from "../features/RobotSlice.js"
import { CustomSelect } from "./CustomSelect.js"

// Componente per modificare la modalità del cane robot
export const Modes = () => {
    const dispatch = useDispatch()
    const isConnected = useSelector(selectIsConnected)
    const currentMode = useSelector(selectCurrentMode)

    // Funzione per inviare al server la modalità che il cane robot dovrà assumere
    const changeRobotMode = async (mode) => {
        if(isConnected) {
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
    }

    const handleChangeMode = mode => {
        dispatch(changeMode(mode))
        changeRobotMode(mode)
    }

    // Lista delle possibili modalità del cane robot
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
        <CustomSelect
            id={"select-mode"}
            value={currentMode}
            onChange={handleChangeMode}
            options={modes}
            label={"Modalità robot"}
        />
    )
}