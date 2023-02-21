import React from "react";

function BtnMenu({ tipo, titulo, setTipoProducto }) {
  return (
    <>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id={tipo}
        autoComplete="off"
        defaultChecked={tipo === "plato"}
      />
      <label
        className="btn btn-outline-danger"
        htmlFor={tipo}
        onClick={() => setTipoProducto(tipo)}
      >
        {titulo}
      </label>
    </>
  );
}

export default BtnMenu;
