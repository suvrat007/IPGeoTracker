import {createSlice} from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        lat:[],
        long:[],
    },
    reducers: {
        addLatitude: (state, action) => {
            state.lat.push(action.payload.latitude);
        },
        addLongitude: (state, action) => {
            state.long.push(action.payload.longitude);
        }
    }
});

export const {addLatitude, addLongitude} = locationSlice.actions;
export default locationSlice.reducer;