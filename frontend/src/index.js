import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import reportWebVitals from './reportWebVitals'
import App from './App'
import Editor from './editor'
import theme from './libs/theme'
import Fonts from './libs/fonts'
import Markdown from './markdown'
import NotFound from './notfound'
import Navbar from './components/Navbar'
import VoxelDog from './components/voxel-dog'
import ShowDetail from './components/show-markdow'
import './css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Fonts />
      <Navbar />
      <VoxelDog />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/markdown" element={<Markdown />} />
        <Route path="/markdown/:id" element={<ShowDetail />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
