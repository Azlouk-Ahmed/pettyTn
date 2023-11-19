import { useEffect, useState } from 'react'
import Signup from './pages/SignUp/Signup'
import Login from './pages/LogIn/Login'
import Landing from './pages/landingPage/Landing'
import { useAuthContext } from './hooks/useAuthContext'
import Header from './components/header/Header'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Timeline from './pages/timeline/Timeline'
import '@mantine/core/styles.css';
import { usePostsContext } from './hooks/usePostsContext'
import Pending from './pages/pending/Pending'
import Post from './components/post/Post'
import Requests from './pages/requests/Requests'




function App() {
  const {auth,dispatch} = useAuthContext();
  useEffect(() => {
    console.log("useEffect hook is running");
    console.log("localStorage length:", localStorage.length);
  
    if (localStorage.length > 0) {
      console.log(JSON.parse(localStorage.getItem("auth")));
      dispatch({ type: "LOGIN", payload: JSON.parse(localStorage.getItem("auth")) });
      //console.log(auth);
    }
  }, []);
  return (
    <div className='app'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={auth? <Landing /> : <Navigate to="/login" />} />
        <Route path='/login' element={!auth? <Login /> : <Navigate to="/" />}  />
        <Route path='/signup' element={!auth? <Signup /> : <Navigate to="/" />} />
        <Route path='/timeline' element={auth ? <Timeline /> : <Navigate to="/login" />} />
        <Route path='/pending' element={auth && auth.user.role === "admin" ? <Pending /> : <Navigate to="/login" />} />
        <Route path='/requests' element={auth && auth.user.role === "admin" ?<Requests /> : <Navigate to="/login" />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
