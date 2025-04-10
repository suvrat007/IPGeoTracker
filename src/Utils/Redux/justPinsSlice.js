import {createSlice} from "@reduxjs/toolkit";

const justPinsSlice = createSlice({
    name: "justPins",
    initialState: {
        coordinates: [],
    },
    reducers: {
        setCoordinates: (state, action) => {
            state.coordinates.push(action.payload);
        },
        deleteCoordinates: (state) => {
            if(state.coordinates.length > 0) {
                state.coordinates=[];
            }
        }
    }
})
export const {setCoordinates,deleteCoordinates} = justPinsSlice.actions;
export default justPinsSlice.reducer;