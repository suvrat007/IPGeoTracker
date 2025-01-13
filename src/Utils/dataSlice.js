import {createSlice} from "@reduxjs/toolkit";


const dataSlice = createSlice({
    name: "dataSlice",
    initialState: {
        dataList: [],
    },
    reducers: {
        addAddress: (state, action) => {
            state.dataList.push(action.payload);
        },
    },

})
export const {addAddress} = dataSlice.actions;
export default dataSlice.reducer ;