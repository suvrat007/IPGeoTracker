import {createSlice} from "@reduxjs/toolkit";

const justPinsSlice = createSlice({
    name: "justPins",
    initialState: {
        coordinates: [],
    },
    reducers: {
        setCoordinates: (state, action) => {
            state.coordinates.push(action.payload);
        }
    }
})
export const {setCoordinates} = justPinsSlice.actions;
export default justPinsSlice.reducer;