import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import CrearVenta from './components/CrearVenta/CrearVenta'   
import HistorialVentas from './components/HistorialVentas/HistorialVentas'  
import HistorialVentaspordia from './components/HistorialVentaspordia/HistorialVentaspordia'
import EliminarVenta from './components/EliminarVenta/EliminarVenta'
import ActualizarVenta from "./components/ActualizarVenta/ActualizarVenta"

function App() {

  return (
    <>
    <Navbar/>
    <CrearVenta/>
    <HistorialVentas/>
    <HistorialVentaspordia/>
    <EliminarVenta/>
    <ActualizarVenta/>

    </>
  )
}

export default App
