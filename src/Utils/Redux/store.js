import {configureStore} from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import locationSlice from "./locationSlice";
import justPinsSlice from "./justPinsSlice";
import loggedinSlice from "./loggedinSlice";
import fileSlice from "./fileSlice";


const store = configureStore({
    reducer: {
        data:dataSlice,
        location : locationSlice,
        justPins: justPinsSlice,
        login: loggedinSlice,
        fileName: fileSlice,
    },
});
export default store;