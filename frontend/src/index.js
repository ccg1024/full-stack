import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './libs/theme';
import Fonts from './libs/fonts';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Markdown from './markdown';
import NotFound from './notfound';
import Navbar from './components/Navbar';
import VoxelDog from './components/voxel-dog';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <BrowserRouter>
        <Fonts />
        <Navbar/>
        <VoxelDog />
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/markdown' element={<Markdown />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
