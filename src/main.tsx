import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.tsx'
import './styles/index.css'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import Signin from './pages/Signin/Signin.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <h1>Houver um erro</h1>,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/home',
        element: <PrivateRoute redirectTo={'/'}><Home /></PrivateRoute>
      },
      {
        path: '/signin',
        element: <Signin />
      }
    ]
  },
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
