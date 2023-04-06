import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import reportWebVitals from './reportWebVitals'
import theme from './libs/theme'
import Fonts from './libs/fonts'
import Login from './components/login'
import Registe from './components/registe'
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
      <Registe />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/markdown" element={<Markdown />} />
          <Route path="/markdown/:id" element={<ShowDetail />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
