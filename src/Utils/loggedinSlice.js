import {createSlice} from "@reduxjs/toolkit";

const loggedinSlice = createSlice({
    name: "loggedinSlice",
    initialState: {
        isLoggedin : false,
    },
    reducers: {
        switchLogin: (state) => {
            state.isLoggedin = !state.isLoggedin;
        },
    }
})
export const {switchLogin} = loggedinSlice.actions;
export default loggedinSlice.reducer;