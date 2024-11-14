import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import UserLoggedIn from '../components/user/UserLoggedIn'
import UserLoggedOut from '../components/user/UserLoggedOut'
import Books from '../pages/Books'
import FourNotFourpage from '../pages/FourNotFourpage'
function UserRoute() {
  return (
    <div>
        <Routes>

          <Route path='' element={<UserLoggedOut/>}>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          </Route>
          <Route path='' element={<UserLoggedIn/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/books' element={<Books/>}/>
          </Route>
          <Route path='*' element={<FourNotFourpage/>}/>
        </Routes>
    </div>
  )
}

export default UserRoute