import {createSlice} from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        pathObjects: [],
    },
    reducers: {
        addPathPair: (state, action) => {
            state.pathObjects.push(action.payload);
        },
    }
});

export const {addPathPair} = locationSlice.actions;
export default locationSlice.reducer;