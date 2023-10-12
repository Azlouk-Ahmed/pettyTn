import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <App />,
    </AuthContextProvider>
)
