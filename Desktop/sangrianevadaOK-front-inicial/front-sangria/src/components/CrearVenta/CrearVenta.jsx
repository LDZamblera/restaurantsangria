import React, { useState } from 'react';
import axios from 'axios';

const productosPermitidos = {
  'SANGRIA NEVADA': 3500,
  'VASO': 200,
  'GASEOSA': 1000,
  'AGUA': 800,
  'HEINEKEN LATA': 2000,
  'IMPERIAL LATA': 1800,
};

const mediosDePagoPermitidos = ['Efectivo', 'Débito', 'Tarjeta de Crédito', 'Transferencia'];

const CrearVenta = () => {
  const [productos, setProductos] = useState([{ producto: '', cantidadVendida: 0 }]);
  const [medioPago, setMedioPago] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [montoTotalProductos, setMontoTotalProductos] = useState(0);

  const handleProductoChange = (index, event) => {
    const { name, value } = event.target;
    const nuevosProductos = [...productos];
    nuevosProductos[index] = { ...nuevosProductos[index], [name]: value };
    setProductos(nuevosProductos);
    setMontoTotalProductos(calcularMontoTotalProductos(nuevosProductos));
  };

  const handleAddProducto = () => {
    if (productos.length < Object.keys(productosPermitidos).length) {
      setProductos([...productos, { producto: '', cantidadVendida: 0 }]);
    } else {
      setError('No se pueden agregar más productos');
    }
  };

  const calcularMontoParcial = (producto) => {
    const precio = productosPermitidos[producto.producto];
    if (precio) {
      return precio * producto.cantidadVendida;
    }
    return 0;
  };

  const calcularMontoTotalProductos = (productos) => {
    return productos.reduce((total, producto) => {
      return total + calcularMontoParcial(producto);
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (productos.some((producto) => !producto.producto || producto.cantidadVendida < 1 || producto.cantidadVendida > 10)) {
      setError('Seleccione un producto y/o ingrese entre 1 y 10 unidades por producto');
      return;
    }

    if (!medioPago) {
      setError('Seleccione un medio de pago');
      return;
    }

    const confirmed = window.confirm('¿Está seguro de realizar la venta?');
    if (!confirmed) return;

    try {
      const montoTotal = calcularMontoTotalProductos(productos);

      const response = await axios.post('http://localhost:3000/crear-venta', {
        productos,
        medioPago,
        montoTotal,
      });

      if (response.status === 201) {
        const { message } = response.data;
        setMensaje(`${message} - Monto total: ${montoTotal}`);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear Venta</h2>
      <form onSubmit={handleSubmit}>
        {productos.map((producto, index) => (
          <div key={index}>
            <select
              name="producto"
              value={producto.producto}
              onChange={(event) => handleProductoChange(index, event)}
            >
              <option value="" disabled>
                Seleccione un producto
              </option>
              {Object.keys(productosPermitidos).map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="cantidadVendida"
              placeholder="Cantidad"
              value={producto.cantidadVendida}
              onChange={(event) => handleProductoChange(index, event)}
              min="1"
              max="10"
            />
            <p>Monto parcial: {calcularMontoParcial(producto)}</p>
          </div>
        ))}
        <button type="button" onClick={handleAddProducto}>
          Agregar Producto
        </button>
        <select
          value={medioPago}
          onChange={(event) => setMedioPago(event.target.value)}
        >
          <option value="" disabled>
            Seleccione un medio de pago
          </option>
          {mediosDePagoPermitidos.map((medio) => (
            <option key={medio} value={medio}>
              {medio}
            </option>
          ))}
        </select>
        <p>MONTO TOTAL: {montoTotalProductos}</p>
        <button type="submit">Crear Venta</button>       
      </form>
      {error && <p>{error}</p>}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearVenta;
