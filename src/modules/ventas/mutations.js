export function setVentas(state, venta) {
  state.ventas = venta;
}

export function setVentasByMonth(state, venta) {
  state.ventasByMonth = venta;
}

export function setError(state, error) {
  state.error = error;
}

export function setErrors(state, error) {
  state.errorMessage = error;
}
