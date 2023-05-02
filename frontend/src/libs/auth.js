import React, { useState, createContext, useContext } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'

const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)

  const handleLogin = async newToken => {
    // get message from server
    setToken(newToken)
    navigate('/home')
  }

  const handleLogout = () => {
    setToken(null)
    // send message to server
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/home" replace state={{ from: location }} />
  }

  return children
}

export default AuthProvider
