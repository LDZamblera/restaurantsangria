import React, { useState } from 'react';
import axios from 'axios';

const EliminarVenta = () => {
  const [ventaId, setVentaId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setVentaId(event.target.value);
  };

  const eliminarVenta = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/eliminar-venta`, {
        data: { _id: ventaId }
      });
      setMessage(response.data.message);
    } catch (error) {
      setError('Error al eliminar la venta');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    eliminarVenta();
  };

  return (
    <div>
      <h2>Eliminar Venta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID de Venta a Eliminar:
          <input
            type="text"
            value={ventaId}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Eliminar</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EliminarVenta;
