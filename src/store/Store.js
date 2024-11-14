import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from '../store/authSlice/AuthSlice'

const store = configureStore({
    reducer:{
        auth: AuthSlice
    }
})
export default store