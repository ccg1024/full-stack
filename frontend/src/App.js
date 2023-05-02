import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthProvider, { ProtectedRoute } from './libs/auth'
import Login from './components/login'
import Navbar from './components/Navbar'
import Registe from './components/registe'
import LoadingPage from './components/page-load'

// lazy load
const Home = lazy(() => import('./pages/home'))
const Editor = lazy(() => import('./pages/editor'))
const Markdown = lazy(() => import('./pages/markdown'))
const NotFound = lazy(() => import('./pages/notfound'))
const DetailNote = lazy(() => import('./pages/detail-note'))
const ShowDetail = lazy(() => import('./pages/show-markdow'))

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Login />
        <Registe />
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="markdown"
              element={
                <ProtectedRoute>
                  <Markdown />
                </ProtectedRoute>
              }
            />
            <Route
              path="markdown/:id"
              element={
                <ProtectedRoute>
                  <ShowDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="editor"
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              }
            />
            <Route path="detail-markdown" element={<DetailNote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  )
}

export default App
