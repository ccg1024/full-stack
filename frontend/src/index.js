import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import reportWebVitals from './reportWebVitals'
import theme from './libs/theme'
import Fonts from './libs/fonts'
import Login from './components/login'
import Navbar from './components/Navbar'
import VoxelDog from './components/voxel-dog'
import LoadingPage from './components/page-load'
import './css/index.css'

// lazy load
const App = React.lazy(() => import('./App'))
const Editor = React.lazy(() => import('./editor'))
const Markdown = React.lazy(() => import('./markdown'))
const NotFound = React.lazy(() => import('./notfound'))
const ShowDetail = React.lazy(() => import('./components/show-markdow'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Fonts />
      <Navbar />
      <VoxelDog />
      <Login />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <App />
            </React.Suspense>
          }
        />
        <Route
          path="/markdown"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <Markdown />
            </React.Suspense>
          }
        />
        <Route
          path="/markdown/:id"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <ShowDetail />
            </React.Suspense>
          }
        />
        <Route
          path="/editor"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <Editor />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              {' '}
              <NotFound />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
