import { useEffect, useState } from 'react'
import Signup from './pages/SignUp/Signup'
import Login from './pages/LogIn/Login'
import Landing from './pages/landingPage/Landing'
import { useAuthContext } from './hooks/useAuthContext'
import Header from './components/header/Header'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Timeline from './pages/timeline/Timeline'
import '@mantine/core/styles.css';




function App() {
  const {auth,dispatch} = useAuthContext();
  useEffect(()=> {
    if(localStorage.length>0){
      dispatch({type: "LOGIN",payload: JSON.parse(localStorage.getItem("auth"))})
    }
  },[dispatch])
  return (
    <div className='app'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={auth? <Landing /> : <Navigate to="/login" />} />
        <Route path='/login' element={!auth? <Login /> : <Navigate to="/" />}  />
        <Route path='/signup' element={!auth? <Signup /> : <Navigate to="/" />} />
        <Route path='/timeline' element={<Timeline />} />
      </Routes>
      </BrowserRouter>
      {/* <Signup /> */}
    </div>
  )
}

export default App
