import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import {Toaster} from "react-hot-toast";
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


const App = () => {

  const {authUser} = useContext(AuthContext); // when authUser is true means user is authenticated
 
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes> {/*check if user is authenticated or not if not then he can't access homepage or profilepage but if he is authenticated then he can but they cannotnot login page*/}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ="/login"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to ="/"/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to ="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
