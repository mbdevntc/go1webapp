import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./features/RobotSlice.js"
import gamepadReducer from "./features/GamepadSlice.js"

const store = configureStore({
    reducer: { 
        robot: robotReducer,
        gamepad: gamepadReducer
    }
})

export default store