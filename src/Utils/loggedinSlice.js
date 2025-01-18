import {createSlice} from "@reduxjs/toolkit";

const loggedinSlice = createSlice({
    name: "loggedinSlice",
    initialState: {
        isLoggedin : false,
        uid: null,
    },
    reducers: {
        switchLogin: (state, action) => {
            state.isLoggedin = !state.isLoggedin;
            state.uid = action.payload;
        },
        logout: (state) => {
            state.uid = null;
            state.isLoggedin = false;
        }
    }
})
export const {switchLogin,logout} = loggedinSlice.actions;
export default loggedinSlice.reducer;