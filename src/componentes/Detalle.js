import React from 'react'

function Detalle({ nombre, precio, cantidad }) {
  return (
    <tr style={{ background: '#FEEFEC' }}>
      <th scope="row">{nombre}</th>
      <td>$ {precio}</td>
      <td>{cantidad}</td>
      <td>$ {cantidad * precio}</td>
    </tr>
  )
}

export default Detalle
