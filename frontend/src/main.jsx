import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import { AuthContextProvider } from './context/authContext.jsx'
import { PostsContextProvider } from './context/postsContext.jsx';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider>
        <PostsContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </PostsContextProvider>
    </MantineProvider>
)
