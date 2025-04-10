import {createSlice} from "@reduxjs/toolkit";

const loggedinSlice = createSlice({
    name: "loggedinSlice",
    initialState: {
        isLoggedin : false,
        uid: null,
    },
    reducers: {
        switchLogin: (state, action) => {
            state.isLoggedin = true;
            state.uid = action.payload;
        },
        logout: (state) => {
            state.uid = null;
            state.isLoggedin = false;
        },
        loggedIn: (state, action) => {
            state.uid = action.payload;
            state.isLoggedin = true;
        }
    }
})
export const {switchLogin,logout,loggedIn} = loggedinSlice.actions;
export default loggedinSlice.reducer;