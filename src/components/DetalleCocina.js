import React from "react";

function DetalleCocina({ nombre, cantidad, nota }) {
  return (
    <tr style={{ background: "#FEEFEC" }}>
      <th scope="row">{nombre}</th>
      <td>{cantidad}</td>
      <td>{nota}</td>
    </tr>
  );
}

export default DetalleCocina;
