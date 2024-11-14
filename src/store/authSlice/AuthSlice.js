import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserCredentials:(state,action) =>{
            state.userInfo = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        userLogOut:(state)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accessToken')
        }

    }
})

export const {setUserCredentials,userLogOut} = authSlice.actions
export default authSlice.reducer
