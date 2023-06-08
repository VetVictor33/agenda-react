import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login.tsx'
import Home from './pages/Home/Home.tsx'
import isAuth from './utils/autentication.ts'
import Signin from './pages/Signin/Signin.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: isAuth() ? <Home /> : <Navigate to={'/'} />
  },
  {
    path: '/signin',
    element: isAuth() ? <Navigate to={'/home'} /> : <Signin />
  }
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
