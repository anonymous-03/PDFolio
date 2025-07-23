// import { useState } from 'react'
import LandingPage from './Pages/Home.jsx'
import './App.css'
// import ToastContextProvider from './context/ToastContextProvider'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
// import UserProfile from './Pages/UserProfile'
import './themes.css'
import { ThemeProvider } from './context/ThemeContext'
import ResumeUpload from './Pages/ResumeUpload'
import TemplateSelection from './Pages/TemplateSelection'
import CascadeLayout from './Templates/CascadeLayout'
import NovaLayout from './Templates/NovaLayout'
import KyotoLayout from './Templates/KyotoLayout'
import TerminalLayout from './Templates/TerminalLayout'
import GalleryLayout from './Templates/GalleryLayout'
import InfographicLayout from './Templates/InfographicLayout'
import { AuthProvider } from './context/AuthContext'
import OAuthCallback from './components/Auth/OAuthCallback'
import PortfolioLink from './Pages/PortfolioLink.jsx'
import ProtectedRoute from './components/Utils/ProtectedRoute'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
              <Dashboard />

        } />
        {/* <Route path='/profile' element={<UserProfile />} /> */}
        <Route path='/upload' element={
          <>
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          </>
        } />
        <Route path='/select-template' element={
          <>
            <ProtectedRoute>
              <TemplateSelection />
            </ProtectedRoute>
          </>
        } />
        <Route path='/auth/callback' element={<OAuthCallback />} />
        <Route path='/portfolio-link' element={
          <>
            <ProtectedRoute>
              <PortfolioLink />
            </ProtectedRoute>
          </>
        } />
        <Route path='/portfolio'>
          <Route path='Cascade/:pid' element={<CascadeLayout />} />
          <Route path='Nova/:pid' element={<NovaLayout />} />
          <Route path='Kyoto/:pid' element={<KyotoLayout />} />
          <Route path='Terminal/:pid' element={<TerminalLayout />} />
          <Route path='The Gallery/:pid' element={<GalleryLayout />} />
          <Route path='The Infographic/:pid' element={<InfographicLayout />} />
        </Route>
      </>

    )
  )

  return (
    <AuthProvider>
      {/* <ToastContextProvider> */}
        <ThemeProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </ThemeProvider>
      {/* </ToastContextProvider> */}
    </AuthProvider>

  )
}

export default App
