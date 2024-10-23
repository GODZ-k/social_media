import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    notification:[],
}

const rtnSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNotification:(state,action)=>{
            state.notification.push(action.payload)
        },
    }

})


export const { setNotification } = rtnSlice.actions
export default rtnSlice.reducer