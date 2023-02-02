import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./features/RobotSlice.js"
import gamepadReducer from "./features/GamepadSlice.js"
import microphoneReducer from "./features/MicrophoneSlice.js"

const store = configureStore({
    reducer: { 
        robot: robotReducer,
        gamepad: gamepadReducer,
        mic: microphoneReducer
    }
})

export default store