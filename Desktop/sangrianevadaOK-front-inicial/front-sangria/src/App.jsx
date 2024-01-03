import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import CrearVenta from './components/CrearVenta/CrearVenta'   

function App() {

  return (
    <>
    <Navbar/>
    <CrearVenta/>
    </>
  )
}

export default App
