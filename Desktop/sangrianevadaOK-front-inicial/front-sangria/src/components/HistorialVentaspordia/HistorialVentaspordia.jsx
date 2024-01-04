import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorialVentaspordia = () => {
  const [fechaConsulta, setFechaConsulta] = useState('');
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setFechaConsulta(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/listadoventas/${fechaConsulta}`);
      setVentas(response.data);
    } catch (error) {
      setError('Error al cargar el historial de ventas por día');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h2>Historial de Ventas por dia:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ingresa la fecha (Año-Mes-Dia):
          <input
            type="text"
            value={fechaConsulta}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Consultar</button>
      </form>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Productos</th>
            <th>Medio de Pago</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
              <td>{venta.montoTotal}</td>
              <td>
                <ul>
                  {venta.productos.map((producto, prodIndex) => (
                    <li key={prodIndex}>
                      {producto.producto}: {producto.cantidadVendida}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{venta.medioPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialVentaspordia;
