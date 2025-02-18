import {configureStore} from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import locationSlice from "./locationSlice";
import justPinsSlice from "./justPinsSlice";
import loggedinSlice from "./loggedinSlice";


const store = configureStore({
    reducer: {
        data:dataSlice,
        location : locationSlice,
        justPins: justPinsSlice,
        login: loggedinSlice,
    },
});
export default store;