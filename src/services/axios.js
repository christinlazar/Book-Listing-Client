import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

Api.interceptors.request.use(
    async config =>{
        const accessToken = JSON.parse (localStorage.getItem('userInfo'))
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    error => Promise.reject(error)
)

Api.interceptors.response.use(
    response => response,
    async error =>{
        console.log("er",error.response)
        if(error.response.status == 401 && error?.response?.data.success == false){
             alert("session has been expired please login again")
             localStorage.removeItem('userInfo')
                window.location.href = '/login'  
                return  
        }
    }
)

export default Api