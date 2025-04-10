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
        deletePathPair: (state) => {
            if(state.pathObjects.length > 0) {
                state.pathObjects = [];
            }
        }
    }
});

export const {addPathPair,deletePathPair} = locationSlice.actions;
export default locationSlice.reducer;