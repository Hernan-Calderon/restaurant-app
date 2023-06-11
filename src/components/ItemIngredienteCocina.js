import React from "react";

function ItemIngredienteCocina({ descripcion, cantidad }) {
  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{descripcion}</td>
      <td>{cantidad}</td>
    </tr>
  );
}

export default ItemIngredienteCocina;
