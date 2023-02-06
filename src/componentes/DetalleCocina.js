import React from 'react'

function DetalleCocina({ nombre, cantidad }) {
  return (
    <tr style={{ background: '#FEEFEC' }}>
      <th scope="row">{nombre}</th>      
      <td>{cantidad}</td>      
    </tr>
  )
}

export default DetalleCocina