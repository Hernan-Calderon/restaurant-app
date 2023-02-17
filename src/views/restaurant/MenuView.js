import React, { useState } from "react";

import Productos from "../../components/Productos";
import BtnCarrito from "../../components/BtnCarrito";

function MenuView({ user }) {
  const [tipoProducto, setTipoProducto] = useState("plato");
  const [tituloProductos, setTituloProductos] = useState("Platos");

  const verProductos = (tipoProducto, tituloProductos) => {
    setTipoProducto(tipoProducto);
    setTituloProductos(tituloProductos);
  };

  return (
    <div>
      <BtnCarrito />
      <div className="container">
        <h1 style={{ color: "#491632" }}>Menú</h1>

        <div className="btn-group" role="group">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="platos"
            autoComplete="off"
            defaultChecked
          />
          <label
            className="btn btn-outline-danger"
            htmlFor="platos"
            onClick={() => verProductos("plato", "Platos")}
          >
            Platos
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="sushi"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-danger"
            htmlFor="sushi"
            onClick={() => verProductos("sushi", "Sushi")}
          >
            Sushi
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="bebidas"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-danger"
            htmlFor="bebidas"
            onClick={() => verProductos("bebida", "Bebidas")}
          >
            Bebidas
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="promociones"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-danger"
            htmlFor="promociones"
            onClick={() => verProductos("promo", "Promociones")}
          >
            Promociones
          </label>
        </div>

        <hr></hr>
        <Productos
          tipoProducto={tipoProducto}
          tituloProductos={tituloProductos}
          user={user}
        />
      </div>
    </div>
  );
}

export default MenuView;
