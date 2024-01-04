import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorialVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchVentas() {
      try {
        const response = await axios.get('http://localhost:3000/listado-total-ventas'); // Reemplaza la URL con la ruta correcta de tu API
        setVentas(response.data);
      } catch (error) {
        setError('Error al cargar el historial de ventas');
      }
    }

    fetchVentas();
  }, []);

  return (
    <div>
      <h2>Historial de Ventas</h2>
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

export default HistorialVentas;
