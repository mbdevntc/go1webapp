import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./features/RobotSlice.js"

const store = configureStore({
    reducer: { 
        robot: robotReducer
    }
})

export default store