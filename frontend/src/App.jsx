import { useState } from 'react'
import Signup from './pages/SignUp/Signup'
import Login from './pages/LogIn/Login'
import Landing from './pages/landingPage/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Landing />
    </>
  )
}

export default App
