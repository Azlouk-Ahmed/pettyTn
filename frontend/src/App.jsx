import { useEffect, useState } from 'react'
import Signup from './pages/SignUp/Signup'
import Login from './pages/LogIn/Login'
import Landing from './pages/landingPage/Landing'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const {auth,dispatch} = useAuthContext();
  useEffect(()=> {
    if(localStorage.length>0){
      dispatch({type: "LOGIN",payload: JSON.parse(localStorage.getItem("auth"))})
    }
  },[dispatch])
  return (
    <>
      <Landing />
      {/* <Signup /> */}
    </>
  )
}

export default App
