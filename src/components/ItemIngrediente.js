import React from "react";

function ItemIngrediente({
  identificador,
  descripcion,
  cantidad,
  eliminarIngrediente,
}) {
  return (
    <tr style={{ background: "#FEEFEC" }}>
      <td>{descripcion}</td>
      <td>{cantidad}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarIngrediente(identificador)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default ItemIngrediente;
