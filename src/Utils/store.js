import {configureStore} from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import locationSlice from "./locationSlice";
import justPinsSlice from "./justPinsSlice";


const store = configureStore({
    reducer: {
        data:dataSlice,
        location : locationSlice,
        justPins: justPinsSlice,
    },
});
export default store;