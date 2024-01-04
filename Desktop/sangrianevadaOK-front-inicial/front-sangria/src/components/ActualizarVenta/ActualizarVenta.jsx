import React, { useState, useEffect } from 'react';
import axios from 'axios';

const metodosDePago = ['Efectivo', 'Transferencia', 'Tarjeta de Crédito', 'Débito'];

const ActualizarVenta = () => {
  const [ventaId, setVentaId] = useState('');
  const [productosVentaAnterior, setProductosVentaAnterior] = useState([]);
  const [productosVentaActualizada, setProductosVentaActualizada] = useState([]);
  const [nuevoMetodoPago, setNuevoMetodoPago] = useState('');
  const [montoTotal, setMontoTotal] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (ventaId) {
      // Realiza la llamada para obtener los detalles de la venta específica según el ID
      axios.get(`http://localhost:3000/ventas/${ventaId}`)
        .then(response => {
          const { productos, metodoPago } = response.data;
          setProductosVentaAnterior(productos);
          setProductosVentaActualizada(productos); // Inicializa la lista de productos actualizados con los originales
          setNuevoMetodoPago(metodoPago);
        })
        .catch(error => setError('Error al obtener los detalles de la venta'));
    }
  }, [ventaId]);

  useEffect(() => {
    // Calcula el monto total en base a las cantidades modificadas
    const total = productosVentaActualizada.reduce((acc, producto) => {
      return acc + producto.cantidad * producto.precio;
    }, 0);
    setMontoTotal(total);
  }, [productosVentaActualizada]);

  const handleIdChange = (event) => {
    setVentaId(event.target.value);
  };

  const handleMetodoPagoChange = (event) => {
    setNuevoMetodoPago(event.target.value);
  };

  const handleCantidadChange = (index, event) => {
    const { value } = event.target;
    if (value >= 0 && value <= 10) {
      const updatedProductos = [...productosVentaActualizada];
      updatedProductos[index].cantidad = value;
      setProductosVentaActualizada(updatedProductos);
    } else {
      setError('La cantidad debe estar entre 0 y 10');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Lógica para actualizar la venta con los cambios en productosVentaActualizada y nuevoMetodoPago
      const response = await axios.put(`http://localhost:3000/ventas/${ventaId}`, {
        productos: productosVentaActualizada,
        metodoPago: nuevoMetodoPago,
      });
      setMessage(response.data.message);
    } catch (error) {
      setError('Error al actualizar la venta');
    }
  };

  return (
    <div>
      <h2>Actualizar Venta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID de Venta:
          <input
            type="text"
            value={ventaId}
            onChange={handleIdChange}
          />
        </label>
        {productosVentaAnterior.map((producto, index) => (
          <div key={index}>
            <p>Producto: {producto.nombre}</p>
            <label>
              Cantidad:
              <input
                type="number"
                value={productosVentaActualizada[index]?.cantidad || producto.cantidad}
                onChange={(event) => handleCantidadChange(index, event)}
              />
            </label>
          </div>
        ))}
        <label>
          Método de Pago:
          <select value={nuevoMetodoPago} onChange={handleMetodoPagoChange}>
            <option value="">Selecciona un método de pago</option>
            {metodosDePago.map((metodo, index) => (
              <option key={index} value={metodo}>
                {metodo}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Actualizar</button>
      </form>
      <p>Monto Total: ${montoTotal}</p>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ActualizarVenta;
