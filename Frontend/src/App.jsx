import { useState } from 'react'
import LandingPage from './pages/Home'
import './App.css'
import ToastContextProvider from './context/ToastContextProvider'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import UserProfile from './Pages/UserProfile'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
      </>

    )
  )

  return (
    <ToastContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ToastContextProvider>
  )
}

export default App
