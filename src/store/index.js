import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./reducers/tab";

export default configureStore({
    reducer: {
        tab: tabReducer
    }
})