import {createSlice} from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: "loggedinSlice",
    initialState: "",
    reducers: {
        addFile: (state, action) => {
            return action.payload;
        }
    }
})
export const {addFile} = fileSlice.actions;
export default fileSlice.reducer;