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
        emptyAddress: (state) => {
            state.dataList = [];
        },
    },

})
export const {addAddress,emptyAddress} = dataSlice.actions;
export default dataSlice.reducer ;